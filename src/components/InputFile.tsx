import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import AppContext from "./AppContext";
import "../styles/InputFile.css";
import mockData from "../mock-status";

const InputFile = (props: any) => {
  const { setPackages, setFilteredPackages } = useContext(AppContext);
  const history = useHistory();

  /**
   * Helper function for sorting
   */
  const sortByName = (a, b) => {
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();
    return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
  };

  /**
   * Format raw text from status file
   * Input: text from status file
   * Return: Array of objects with name, description, depends and id properties
   */
  const getData = (text: string) => {
    const packagesSplitted = text.split("\n\n");

    const data: {
      name: string;
      description: string;
      depends: any[];
      id: number;
    }[] = packagesSplitted
      .map((currentPackage, id) => {
        const name = currentPackage.slice(9, currentPackage.indexOf("\n"));

        const descriptionStart = currentPackage.indexOf("Description:");
        const description = currentPackage
          .slice(descriptionStart)
          .replace(/Homepage.+/, "")
          .replace("Description: ", "");

        const dependStart = currentPackage.indexOf("Depends:");
        const depends =
          dependStart > -1
            ? currentPackage
                .slice(
                  dependStart + 9,
                  currentPackage.indexOf("\n", dependStart)
                )
                .replace(/\(.+?\)/g, "")
                .split(",")
                
            : [];
          
        const packageData = { name, description, depends, id };
        return packageData;
      })
      .filter((elem) => elem.name);

    data.sort(sortByName);
    data.forEach((pack, i) => {
      pack.id = i + 1;
    });

    /**
     * Format depends field to show ID of the package, not package name
     */
    const dataMap = new Map();
    data.forEach((v) => dataMap.set(v.name, v));
    data.forEach((v) => {
      v.depends = v.depends
        .map((elem) => {
          let i = dataMap.get(elem.trim());
          if (!i) return null;
          let pipeChar = i.name.indexOf("|");
          if (pipeChar > -1) {
            i.name = i.slice(0, pipeChar - 1);
          }
            return i.id;
          
        })
        .filter((elem) => elem);
    });

    setPackages(data);
    setFilteredPackages(data);
    history.push("/packages");
  };

  const inputForm: React.RefObject<HTMLInputElement> = React.createRef();

  const loadFile = async () => {
    const inputFiles = inputForm.current?.files || [];
    if (inputFiles.length > 0) {
      const text = await inputFiles[0].text();
      getData(text);
    }
  };

  const showMockData = () => {
    getData(mockData);
  };

  return (
    <div className="container">
      <h1 className="paragraph">
        Upload "status" file from /var/lib/dpkg/status to view your packages
        nicley formatted.
      </h1>
      <Form className="file-input">
        <Form.File
          id="custom-file"
          label="Upload status file"
          custom
          onChange={loadFile}
          ref={inputForm}
        />
      </Form>
      <p>
        <Button variant="link" onClick={showMockData}>
          Click here
        </Button>{" "}
        to view mock data instead.
      </p>
    </div>
  );
};

export default InputFile;
