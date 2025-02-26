// import { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [reminders, setReminders] = useState([]);
//   const [message, setMessage] = useState("");
//   const [phone, setPhone] = useState("");
//   const [scheduledTime, setScheduledTime] = useState("");

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   const fetchReminders = async () => {
//     const response = await axios.get("http://localhost:5000/reminders");
//     setReminders(response.data);
//   };

//   const addReminder = async () => {

//     let formattedPhone = phone.trim();
//     if (!formattedPhone.startsWith("+")) {
//       formattedPhone = `+91${formattedPhone}`;  // Add country code if missing
//     }

//     await axios.post("http://localhost:5000/reminders", {
//       message,
//       phone,
//       scheduledTime,
//     });
//     setMessage("");
//     setPhone("");
//     setScheduledTime("");
//     fetchReminders();
//   };

//   return (
//     <div>
//       <h1>Reminder App</h1>
//       <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
//       <button onClick={addReminder}>Add Reminder</button>
      
//       <h2>Reminders</h2>
//       <ul>
//         {reminders.slice(1).map((reminder, index) => (
//           <li key={index}>
//             {reminder[1]} - {reminder[2]} - {reminder[3]} - {reminder[4]}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


function App() {
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const local = "http://localhost:5000/reminders"
  const server = "https://reminder-app-backend-7hx5.onrender.com/reminders"

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const response = await axios.get(server);
    setReminders(response.data);
  };

  const addReminder = async () => {
    let formattedPhone = phone.trim();
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    await axios.post(server, {
      message,
      phone: formattedPhone,
      scheduledTime,
    });

    setMessage("");
    setPhone("");
    setScheduledTime("");
    fetchReminders();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(reminders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setReminders(items);
  };

  console.log("Thank you all");
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A4C93", "#118AB2"];

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-red bg-dark px-3 py-2">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="	https://www.finchtech.in/images/finch_logo.png"
            alt="Logo"
            className="me-2"
            style={{ height:'40px', width:'80px'}}
          />
          {/* <span className="fw-bold fs-5">Reminder App</span> */}
        </a>
        <div className="ms-auto d-flex align-items-center">
          {/* <span className="text-white fw-bold fs-6 me-3">Gurunath Solutions</span> */}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`min-vh-100 d-flex flex-column align-items-center py-4 ${
          darkMode ? "bg-dark text-white" : "bg-light"
        }`}
      >
        {/* Add Reminder */}
        <div
          className="card shadow-lg text-white p-4 w-100 w-md-75 w-lg-50"
          style={{
            maxWidth: "450px",
            background: darkMode
              ? "linear-gradient(135deg, #232526, #414345)"
              : "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "15px",
          }}
        >
          <h4 className="text-center mb-3">🎯 Add a Reminder</h4>

          <div className="mb-2">
            <input
              type="text"
              className="form-control border-0 shadow-sm"
              placeholder="Reminder Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="form-control border-0 shadow-sm"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <input
              type="datetime-local"
              className="form-control border-0 shadow-sm"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>

          <button className="btn btn-light text-dark fw-bold w-100" onClick={addReminder}>
            ➕ Add Reminder
          </button>
        </div>

        {/* Grid-Based Reminders */}
        <div className="container mt-4">
          <h5 className="mb-3">{darkMode ? "🌙" : "☀️"} Your Reminders</h5>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="reminders" direction="horizontal">
              {(provided) => (
                <div
                  className="row g-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {reminders.slice(1).map((reminder, index) => (
                    <Draggable
                      key={index}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="col-12 col-md-6 col-lg-4"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className="p-3 text-white rounded shadow-sm animate__animated animate__fadeIn"
                            style={{
                              background: colors[index % colors.length],
                              borderRadius: "12px",
                            }}
                          >
                            <h6 className="mb-1">{reminder[1]}</h6>
                            <p className="mb-1">{reminder[2]}</p>
                            <small>{reminder[3]}</small>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
