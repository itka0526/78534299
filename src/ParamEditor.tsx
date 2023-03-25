import { useEffect, useState } from "react";

type Color = "red" | "green" | "blue";

interface Param {
    id: number;
    name: string;
    // had to make this optional
    type?: "string";
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Model {
    paramValues: ParamValue[];
    colors?: Color[];
}
interface ParamEditorProps {
    params: Param[];
    model: Model;
}

type LabelInputLayoutProps = {
    paramKey: Param;
    paramValue: ParamValue;
    handler: (paramKey: Param, paramValue: ParamValue) => void;
};

export default function ParamEditor({ params, model }: ParamEditorProps) {
    const { customEntries, handleChange, getModel } = useLableInputLayout(params, model);

    /**
     *  Send the received data to some API?
     *  fetch('/api/v1/blah', {header: ..., method: ..., body: JSON.stringify(getModel()) })
     */

    return (
        <div>
            {[...customEntries].map(([paramKey, paramValue]) => (
                <LabelInputLayout key={paramKey.id} paramKey={paramKey} paramValue={paramValue} handler={handleChange} />
            ))}
        </div>
    );
}

// abstracting the code in a hook because ParamEditor just needs the input/output of the function
const useLableInputLayout = (params: ParamEditorProps["params"], model: ParamEditorProps["model"]) => {
    // it has the corresponding key and value for param[] and paramValue[]
    const [customEntries, setCustomEntries] = useState<Map<Param, ParamValue>>(new Map());

    useEffect(() => {
        // used Map instead of Array to add more flexibility
        const result = new Map<Param, ParamValue>();

        for (let key of params) {
            // finds the corresponding paramValue and assigns it to the key itself
            const value = model.paramValues.find(({ paramId }) => paramId === key.id);

            // if somehow value is undefined we should skip the current iteration because there is no value
            if (!value) continue;

            result.set(key, value);
        }

        setCustomEntries(result);
    }, [params, model]);

    const handleChange = (k: Param, v: ParamValue) => {
        const newMap = new Map(customEntries).set(k, v);
        setCustomEntries(newMap);
    };

    const getModel = () => {
        return customEntries;
    };

    return {
        customEntries,
        handleChange,
        getModel,
    };
};

function LabelInputLayout({ paramKey, paramValue, handler }: LabelInputLayoutProps) {
    return (
        <div>
            <label> {paramKey.name} </label>
            <input
                // making it more extendable if there are not specific type it should default to string type :D
                type={paramKey.type ?? "string"}
                value={paramValue.value}
                onChange={(e) => {
                    const updatedValue: ParamValue = { ...paramValue, value: e.target.value };
                    handler(paramKey, updatedValue);
                }}
            />
        </div>
    );
}
