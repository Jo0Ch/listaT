//1
    const INPUT = document.getElementById("iputid");
    const BTNAGREGAR = document.getElementById("buttonid");
    const CONTENEDORT = document.getElementById("contenedor_tareas");

    const Numero = document.getElementById("numero");

    //3
    // let tareas= [];

    // const GUARDARENLS = () =>{
    //     localStorage.setItem("KEYLOCALS", JSON.stringify(tareas))
    // }

    //2

    function agregarv2(){
        let valorInput = INPUT.value;
        // Obtener el div visible actualmente
        var divVisible = document.querySelector("div[style*='display: block']");
        var divId = divVisible.id;
        // Determinar en qué array almacenar el texto
        if(divId == "contenedor_tareas"){
            var array = JSON.parse(localStorage.getItem("KEYLOCALS"));
            array.push({tarea:valorInput,
           terminada: false,});
           localStorage.setItem("KEYLOCALS", JSON.stringify(array));

        }else if(divId == "uni"){
            var array = JSON.parse(localStorage.getItem("KeyLOCALSUNI")) || [];
            array.push({tarea:valorInput,
           terminada: false,});
           localStorage.setItem("KeyLOCALSUNI", JSON.stringify(array));
            
        }else if(divId == "vida"){
            var array = JSON.parse(localStorage.getItem("KeyLOCALSVID")) || [];
            array.push({tarea:valorInput,
           terminada: false,});
           localStorage.setItem("KeyLOCALSVID", JSON.stringify(array));
        }
        renderLista(divVisible);

        INPUT.value = "";

    }

    function renderLista(div){
        var array;
        if (div.id == "contenedor_tareas"){
            array = JSON.parse(localStorage.getItem("KEYLOCALS")) || [];
            
        } else if(div.id == "uni"){
            array = JSON.parse(localStorage.getItem("KeyLOCALSUNI")) || [];
            
        }else if(div.id == "vida"){
            array = JSON.parse(localStorage.getItem("KeyLOCALSVID")) || [];
            
        }
       
        var contenedorLi = div.querySelector("ul");
        contenedorLi.innerHTML = "";

        for(const [indice, tarea] of array.entries()){
            const LI = document.createElement("li");
            
            const BTNELIMINAR = document.createElement("button");
            BTNELIMINAR.classList.add("enlace-eliminar");
            BTNELIMINAR.innerText = "Borrar"; // x ahora tengo un png
            BTNELIMINAR.LI = LI//agrega referencia al <li>
            
            BTNELIMINAR.onclick = function() {
                this.LI.parentNode.removeChild(this.LI);
                
                var divVisible = document.querySelector("div[style*='display: block']");
                var divId = divVisible.id;
                /*
                otra forma de conseguir el indx
                var indice = array.indexOf(this.li.innerText);
                array.splice(indice, 1);
                */
                array.splice(indice, 1);
                guardarEnLs(divId, array);
                Numero.innerHTML = array.length;
                
            }

            const $SPAN = document.createElement("span");
            $SPAN.textContent = tarea.tarea;
            
            
            LI.appendChild($SPAN);
            LI.appendChild(BTNELIMINAR);
            contenedorLi.appendChild(LI);
        };
        Numero.innerHTML = array.length;
    } 
   
    function guardarEnLs(elementohtml, recibiendoArray){
        if (elementohtml == "contenedor_tareas"){
            localStorage.setItem("KEYLOCALS", JSON.stringify(recibiendoArray));
        }else if(elementohtml == "uni"){
            localStorage.setItem("KeyLOCALSUNI", JSON.stringify(recibiendoArray));
        } else if(elementohtml == "vida"){
            localStorage.setItem("KeyLOCALSVID", JSON.stringify(recibiendoArray));
        }
    }

    //tab
    function openCity(evt, nombredPestaña) {
        var i, x , tablinks;
        x = document.getElementsByClassName("pestalla");//contenedor div
        for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        }
    
        tablinks = document.getElementsByClassName("tablink");//button

        for (i = 0; i < x.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" btontabColor", "");
        }

        document.getElementById(nombredPestaña).style.display = "block";

        evt.currentTarget.className += " btontabColor";//es muy importante el espacio al comienzo  del nombre d la class, para que no se junte con los otros nombres. el nombre se usa en css

        //let divVisible = document.querySelector("div[style*='display: block']");
        //renderLista("uni");
        if(nombredPestaña == "contenedor_tareas"){
            renderLista(contenedor_tareas);
        }else if(nombredPestaña == "uni"){
            renderLista(uni);
        }else if(nombredPestaña == "vida"){
            renderLista(vida);
        }
    }
    renderLista(contenedor_tareas);//carga los elementos <li>e hijos al entrar x 1ra vez 
    /* funciona
    BTNELIMINAR.onclick = (evento) =>{
                    evento.preventDefault();

                    var divVisible = document.querySelector("div[style*='display: block']");
                    var divId = divVisible.id;
                    
                    array.splice(indice, 1);
                    guardarEnLs(divId, array);
                    
                }
    */
