import { useState } from "react";
import "./App.css";
import ParamEditor from "./ParamEditor";

function App() {
    const [state, setState] = useState();

    return (
        <div className="App">
            <ParamEditor
                params={[
                    {
                        id: 1,
                        name: "Назначение",
                    },
                    {
                        id: 2,
                        name: "Длина",
                    },
                    {
                        id: 3,
                        name: "World",
                    },
                ]}
                model={{
                    paramValues: [
                        {
                            paramId: 1,
                            value: "повседневное",
                        },
                        {
                            paramId: 2,
                            value: "макси",
                        },
                        {
                            paramId: 3,
                            value: "hello",
                        },
                    ],
                    colors: ["red", "blue", "green"],
                }}
            />
        </div>
    );
}

export default App;
