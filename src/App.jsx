import React from 'react'
import LoadFile from './components/LoadFIle.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas,far);
export default App =>{
    return (
        <>
        <header className='header'>
           <img src="https://coopcues.com/wp-content/uploads/2021/10/Logo-COOPCUES-Color-2.png" alt="Logo" />
         
        <h1>  <FontAwesomeIcon icon="fa fa-clipboard-check" /> Registro de asistencia </h1>
        </header>
        <section>
            <LoadFile url='./people.xlsx'/>
        </section>
        <footer><span> Copyright 2023 Desarrollado por <a href='https://github.com/adiazwise'>Andrés Díaz</a></span></footer>
        </>
        
    )
}