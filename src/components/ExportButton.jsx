import { utils, writeFileXLSX } from 'xlsx';

export default function ExportButton(props){

    const handleClick = () =>{
        
        const ws = utils.json_to_sheet(props.jsonData);
        const wb = utils.book_new();

        let jsonToExport = props.jsonData.map(item => ({...item,asistencia:item.asistencia?'Si':'No'}));

        utils.sheet_add_aoa(ws, [[
            "Código", "Nombre", "Asistencia",
          ]], { origin: "A1" });

          utils.sheet_add_json(ws, jsonToExport, { skipHeader: true, origin: "A2" });

        utils.book_append_sheet(wb, ws, "registrados");
        writeFileXLSX(wb, `${props.fileName}.xlsx`);
    }

    return (
        <button className="btn btn-primary" onClick={handleClick}>{props.label}</button>
    )
}
