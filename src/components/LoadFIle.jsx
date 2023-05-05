import React,{ useState,useEffect,useCallback } from "react";
import { read, utils, writeFile } from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExportButton from './ExportButton.jsx'

const LoadFile = ({url}) => {
    const [jsonData,setJsonData] = useState([]);
    const [isLoaded,setLoaded] = useState(false);
    const [textValue,setTextValue] = useState('');
   

    useEffect (() => {
       fetchDataAsync();
    },[]);

    console.log("Rendering handle normal...");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const convertedData = tils.sheet_to_json(worksheet, { header: 1 });
          
          let jsonToData = [];

          convertedData.forEach(item => {
              jsonToData.push({
                  codigo:item.CODIGOS,
                  nombre:item.NOMBRES,
                  asistencia:false
              });
          });
          setJsonData(jsonToData);

        };
        reader.readAsBinaryString(file);
      };



    const fetchDataAsync = async () =>{
        if(!isLoaded)
        {
            const response = await  fetch(url);
            const arrayBuffer = await response.arrayBuffer();

            const data = new Uint8Array(arrayBuffer);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const results = utils.sheet_to_json(worksheet);
    
            
            console.clear();
           
            let jsonToData = [];

            results.forEach(item => {
                jsonToData.push({
                    codigo:item.CODIGOS,
                    nombre:item.NOMBRES,
                    asistencia:false
                });
            });
            setJsonData(jsonToData);
         
             setLoaded(true);
            
           
           
        }
    };

    const filteredData = jsonData.filter(data =>{
      
      return data.nombre.toLowerCase().includes(textValue.toLowerCase());
        
    });

    const handleSearch = (event)=>{
       
     setTextValue(event.target.value);
    }

    const handleAddAttendanceCallBack = useCallback((item)=>{
        let updatedItem = {...item,asistencia:true};

        const itemIndex = jsonData.findIndex((dataItem) => dataItem.codigo === item.codigo);
     
        const updatedData = [...jsonData];
        updatedData[itemIndex] = updatedItem;

       
        setJsonData(updatedData);
         
    },[jsonData]);

    const handleAddAttendance =(item) =>{
        
        const itemIndex = jsonData.findIndex((dataItem) => dataItem.codigo === item.codigo);
      
         const dataToUpdate = [...jsonData];
         dataToUpdate[itemIndex].asistencia = !item.asistencia;

        setJsonData(dataToUpdate);
      
    }

    return (
            <>

           
              {isLoaded ?(
              <div >

                <div className="input-group mb-3">
                <span className="input-group-text">
                    <FontAwesomeIcon icon="fa-solid fa-search "/>
                </span>
                    <input className="form-control"
                        type='text' 
                        value={textValue}
                        onChange={handleSearch}
                         placeholder="Indique el nombre"
                        />
                </div>
                        <br/>
                      
                       <div className="list-container">
                  
                       <ul  >
                       <ExportButton  jsonData={jsonData} fileName="registrados" label="Exportar a Excel"/>
                          
                            <li className="header-item  ">
                            
                                <span>NOMBRE</span> <span>ASISTENCIA</span>
                            </li>
                        {filteredData.map((item,index) =>(
                            
                           <li className="select-item list-group-item "
                                key={index} 
                                onClick={()=>handleAddAttendance(item)}>
                            
                               <span>{item.nombre}</span>
                             
                               {item.asistencia
                                        ? (<FontAwesomeIcon icon="fa-solid fa-square-check " size="2x" color="green"   />)
                                        :(<FontAwesomeIcon icon="fa-solid fa-square" size="2x" color="green"  />)
                               }

                            </li>
                           
                        ))}
                        </ul>
                       </div>
                       
                </div>
                ):
                  (<p>Cargando datos...</p>)
                }
            </>);
};

export default LoadFile;