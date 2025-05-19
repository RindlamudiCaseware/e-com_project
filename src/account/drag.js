import { useEffect, useState ,useRef} from "react";
import axios from "axios";

const Drag = () =>{

  const [data, setData] = useState([]);
  const [isDragging , setIsDragging] = useState()

  const containerRef = useRef()

  const getData = () => {
    axios.get("http://localhost:1234/account")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log("Error Fetching Data", error);
      });
  };

  useEffect(() =>{
    getData();
  } , [])

  const detectLeftButton = (e) =>{
    e = e || window.event;
    if("buttons" in e){
      return e.buttons === 1;
    }

    let button = e.which  || e.button;
    return button === 1;

  }

  const dragStart = (e , index) =>{
    if(!detectLeftButton()) return; // only left button clicked
    setIsDragging(index)

    const styledata = containerRef.current;
    const items = [...styledata.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_,i) => i !==index);
    const dragData = data[index];


    let newData = [...data];
    const dragBoundingReact = dragItem.getBoundingClientRect();

    const space = items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().bottom;

    dragItem.style.position = "fixed";
    dragItem.style.zindex = 5000 ;
    dragItem.style.width = dragBoundingReact.width + "px" ;
    dragItem.style.height = dragBoundingReact.height + "px" ;
    dragItem.style.top = dragBoundingReact.top + "px" ;
    dragItem.style.left = dragBoundingReact.left + "px" ;
    dragItem.style.cursor = "grabbing" ;



    const div = document.createElement("div");
    div.id = "div-temp"
    div.style.width = dragBoundingReact.width + "px" ;
    div.style.height = dragBoundingReact.height + "px" ;
    div.style.pointerEvents = "none"
    styledata.appendChild(div);


    const distance = dragBoundingReact.height + space;


    itemsBelowDragItem.forEach(item =>{
      item.style.transform = `translateY(${distance}px)`;
    })

    let x = e.clientX;
    let y = e.clientY;

    document.onpointermove = dragMove;

    function dragMove(e) { 
      const posX = e.clientX -x;
      const posY = e.clientY - y;

      dragItem.style.transform  = `translate(${posX}px , ${posY}px)`;

      notDragItems.forEach(item =>{

        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping = 
          rect1.y < rect2.y + (rect2.height / 2) && rect1.y + (rect1.height / 2) > rect2.y;

          if(isOverlapping){
            if(item.getAttribute("style")){
              item.style.transform = "";
              index++
            }else{
              item.style.transform = `translateY(${distance}px)`;
              index--
            }

            newData = data.filter(item => item.id !== dragData.id);
            newData.splice(index , 0 , dragData)
          }
      })
    }

    //drag end
    document.onpointerup = dragEnd;

    function dragEnd(){
      document.onpointerup = "";
      document.onpointermove = "";

      setIsDragging(undefined);
      dragItem.style = "";
      styledata.removeChild(div);

      items.forEach(item => item.style = "");
      setData(newData);
    }

  }
  return (
    <div className="styledata" ref={containerRef}>
      {
        data.map((dname, index) => (
          <div key={index} className={`data noselect ${isDragging === index ? 'dragging' : ''}`} onPointerDown={e => dragStart(e, index)}
          onDragStart={e => e.preventDefault()}>
            <section>
              <h5>{dname.fname}</h5>
              <p>{dname.email}</p>
              <p>{dname.mobile}</p>
            </section>
          </div>
        ))
      }
    </div>
  );
  
}

export default Drag;