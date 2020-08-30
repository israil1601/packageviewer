import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router";
import PackageCard from "./PackageCard";
import AppContext from "./AppContext";


const InputFile = (props: any) => {
  const { setPackages, setFilteredPackages } = useContext(AppContext);
  const history = useHistory();
  const getData = (str: string) => {
    const arr = str.split("\n\n");

    const data = arr.map((pack, id) => {
      const name = pack.slice(9, pack.indexOf("\n"));
      const descriptionStart = pack.indexOf("Description:");
      const description = pack
        .slice(descriptionStart)
        .replace(/Homepage.+/, "")
        .replace("Description: ", "");
      const dependStart = pack.indexOf("Depends:");
      const depends =
        dependStart > -1
          ? pack
              .slice(dependStart + 9, pack.indexOf("\n", dependStart))
              .replace(/\(.+\)/, "")
              .split(",")
          : [];
      const obj = { name, description, depends, id: id + 1 };
      // return <PackageCard name={name} key={i} description={description} depends={depends}/>
      return obj;
    });

    const dataMap = new Map();
    data.forEach((v) => dataMap.set(v.name, v));
    data.forEach((v) => {
      v.depends = v.depends
        .map((elem) => {
          const i = dataMap.get(elem.trim());
          if (i) {
            return i.id;
          }
          return null;
        })
        .filter((elem) => elem);
    });
    // console.log(data);
    setPackages(data);
    setFilteredPackages(data);
    // return <Redirect to="/packages"/>
    history.push("/packages")
  };

  const inputForm: React.RefObject<HTMLInputElement> = React.createRef();

  const loadFile = async () => {
    const inputFiles = inputForm.current?.files || [];
    if (inputFiles.length > 0) {
      const text = await inputFiles[0].text();
      getData(text);
      // props.onFileInput(getData(text));
    }
  };
  return (
    <div>
      <Form>
        <Form.File
          id="custom-file"
          label="Custom file input"
          custom
          onChange={loadFile}
          ref={inputForm}
        />
      </Form>
    </div>
  );
};

export default InputFile;
