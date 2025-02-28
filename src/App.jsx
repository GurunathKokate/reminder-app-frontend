import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import "./App.css"


function App() {
  const [reminders, setReminders] = useState([]);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(true);

 
 //LOCAL SERVER for Development
  // const server = "http://localhost:5000/reminders"

  //LIVE SERVER 
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


const deleteReminder = async (id) => {
  try {
    await axios.delete(`${server}/${id}`); // Send DELETE request to backend
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder[0] !== id)); // Update UI
  } catch (error) {
    console.error("Error deleting reminder:", error);
  }
};


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(reminders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setReminders(items);
  };

    // Navbar Hide on Scroll Logic
    useEffect(() => {
      let lastScrollY = window.scrollY;
      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastScrollY = window.scrollY;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  


    const toggleComplete = (id) => {
      console.log(id);
      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder[0] === id ? { ...reminder, completed: !reminder.completed } : reminder
        )
      );
    };


  console.log("Thank you all");
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#C29CF6", "#fdb77b"];
  const darkcolors = ["#D65C5C", "#3FAFA8", "#D9B357", "#A38AD4", "#D79A68"];
  const fontcolors = ["#FFF8E1", "#1A535C", "#7A4419", "#251D3A", "#4A2C1F"];



  return (
    <div className={darkMode ? "dark-mode" : ""}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg px-3 py-2 navbar-style ${visible ? "visible" : "hidden"}`}>
        <a className="navbar-brand d-flex align-items-center" href="#">
          {/* <img
            src="	https://www.finchtech.in/images/finch_logo.png"
            alt="Logo"
            className="me-2"
            style={{ height:'40px', width:'80px'}}
          /> f73859 */}

          <svg width="180.9" height="60" viewBox="0 0 370 84.90202255002063" class="looka-1j8o68f"><defs id="SvgjsDefs3696"></defs>
          <g id="SvgjsG3697" featurekey="QMusi1-0" transform="matrix(1.112293888900958,0,0,1.112293888900958,-5.931057330929156,-13.082723378674153)">
            <path fill="#FF6B6B" xmlns="http://www.w3.org/2000/svg" d="M48.1534348,11.7619305H16.4500141c-6.1412687,0-11.1177387,4.9762363-11.1177387,11.117506v31.7050896  c0,6.1412697,4.97647,11.1209183,11.1177387,11.1209183h31.7034206c6.1408806,0,11.1209221-4.9796486,11.1209221-11.1209183  V22.8794365C59.2743568,16.7381668,54.2943153,11.7619305,48.1534348,11.7619305z"></path>
            <path fill="#4ECDC4" xmlns="http://www.w3.org/2000/svg" d="M88.5045242,33.0447998H69.3097229c-3.7171402,0-6.735157,3.0149879-6.735157,6.7286339V58.970253  c0,3.7202072,3.0180168,6.7351913,6.735157,6.7351913h19.1948013c3.7205505,0,6.732048-3.0149841,6.732048-6.7351913V39.7734337  C95.2365723,36.0597878,92.2250748,33.0447998,88.5045242,33.0447998z"></path>
            <path fill="#FFD166" xmlns="http://www.w3.org/2000/svg" d="M77.1422272,69.7399445H66.3590775c-2.0880737,0-3.7845116,1.6946945-3.7845116,3.7879639V84.307991  c0,2.0894699,1.6964378,3.7845078,3.7845116,3.7845078h10.7831497c2.089859,0,3.7831879-1.6950378,3.7831879-3.7845078V73.5279083  C80.925415,71.434639,79.2320862,69.7399445,77.1422272,69.7399445z"></path>
            <path fill="#C29CF6" xmlns="http://www.w3.org/2000/svg" d="M56.8350182,69.7399445h-6.9482002c-1.3468742,0-2.4389496,1.0938187-2.4389496,2.4375916v6.9547577  c0,1.343811,1.0920753,2.4376297,2.4389496,2.4376297h6.9482002c1.3485832,0,2.4393387-1.0938187,2.4393387-2.4376297V72.177536  C59.2743568,70.8337631,58.1836014,69.7399445,56.8350182,69.7399445z"></path></g>

          <g id="SvgjsG3698" featurekey="UyNsn2-0" transform="matrix(3.7548872662935615,0,0,3.7548872662935615,117.82178430196316,-5.651883545554135)" fill="#708090  "><path d="M3.94 13.620000000000001 c-0.42666 -0.17334 -0.82332 -0.36666 -1.19 -0.58 s-0.68332 -0.47 -0.94998 -0.77 s-0.47332 -0.65334 -0.61998 -1.06 s-0.22 -0.89 -0.22 -1.45 c0 -0.69334 0.12 -1.3033 0.36 -1.83 s0.57666 -0.97 1.01 -1.33 s0.95668 -0.63334 1.57 -0.82 s1.2933 -0.28 2.04 -0.28 c0.61334 0 1.24 0.06334 1.88 0.19 s1.4067 0.34332 2.3 0.64998 l-1.36 2.44 c-0.86666 -0.41334 -1.78 -0.62 -2.74 -0.62 c-0.18666 0 -0.38 0.02 -0.58 0.06 s-0.38 0.11 -0.54 0.21 s-0.29334 0.23666 -0.4 0.41 s-0.16 0.4 -0.16 0.68 c0 0.22666 0.04334 0.41332 0.13 0.55998 s0.19666 0.27332 0.33 0.37998 s0.28668 0.19666 0.46002 0.27 s0.34668 0.14334 0.52002 0.21 l1.18 0.46 c0.50666 0.2 0.97 0.41 1.39 0.63 s0.77666 0.48666 1.07 0.8 s0.52 0.69668 0.68 1.15 s0.24 1.02 0.24 1.7 s-0.12334 1.3 -0.37 1.86 s-0.60666 1.0367 -1.08 1.43 s-1.0567 0.7 -1.75 0.92 s-1.4867 0.33 -2.38 0.33 c-0.41334 0 -0.79334 -0.01334 -1.14 -0.04 s-0.68332 -0.07332 -1.01 -0.13998 s-0.65332 -0.14666 -0.97998 -0.24 s-0.67666 -0.21334 -1.05 -0.36 l0.68 -2.8 c0.54666 0.14666 1.0833 0.27666 1.61 0.39 s1.0633 0.17 1.61 0.17 c0.73334 0 1.2933 -0.09666 1.68 -0.29 s0.61332 -0.56334 0.67998 -1.11 c0.02666 -0.28 -0.0066796 -0.51334 -0.10002 -0.7 s-0.22668 -0.34332 -0.40002 -0.46998 s-0.36668 -0.23 -0.58002 -0.31 l-0.64 -0.24 z M12.600000000000001 12.04 l-1.66 0 l1.32 -2.48 l2.9 0 l0.24 1.12 c0.30666 -0.34666 0.68332 -0.63 1.13 -0.85 s0.96332 -0.33 1.55 -0.33 c1.3733 0 2.3534 0.5 2.94 1.5 c0.33334 -0.46666 0.72668 -0.83332 1.18 -1.1 s1.02 -0.4 1.7 -0.4 c1.2 0 2.0766 0.31666 2.63 0.95 s0.83 1.6433 0.83 3.03 l0 6.52 l-3.04 0 l0 -5.98 c0 -0.64 -0.10334 -1.0933 -0.31 -1.36 s-0.56332 -0.4 -1.07 -0.4 c-0.21334 0 -0.41 0.02334 -0.59 0.07 s-0.33334 0.13332 -0.46 0.25998 s-0.22666 0.3 -0.3 0.52 s-0.11 0.51 -0.11 0.87 l0 6.02 l-3.04 0 l0 -6.02 c0 -0.66666 -0.11666 -1.12 -0.35 -1.36 s-0.55668 -0.36 -0.97002 -0.36 c-0.2 0 -0.38666 0.02 -0.56 0.06 s-0.33 0.12 -0.47 0.24 s-0.25 0.29334 -0.33 0.52 s-0.12 0.52666 -0.12 0.9 l0 6.02 l-3.04 0 l0 -7.96 z M35.019999999999996 15.42 c-0.13334 -0.02666 -0.2733 -0.04338 -0.41996 -0.050038 s-0.27332 -0.01 -0.37998 -0.01 c-0.56 0 -1.0133 0.08666 -1.36 0.26 s-0.52 0.47334 -0.52 0.9 c0 0.26666 0.06334 0.47666 0.19 0.63 s0.28332 0.26668 0.46998 0.34002 s0.38332 0.11668 0.58998 0.13002 s0.38332 0.02 0.52998 0.02 c0.26666 0 0.56666 -0.03334 0.9 -0.1 l0 -2.12 z M33.98 13.219999999999999 c0.10666 0 0.24996 0.0033594 0.42996 0.01002 s0.38334 0.01666 0.61 0.03 c-0.01334 -0.52 -0.19668 -0.85666 -0.55002 -1.01 s-0.81 -0.23 -1.37 -0.23 c-0.30666 0 -0.66 0.03666 -1.06 0.11 s-0.83334 0.18334 -1.3 0.33 l-0.32 -1.1 c-0.04 -0.14666 -0.09666 -0.36 -0.17 -0.64 s-0.12334 -0.5 -0.15 -0.66 c0.66666 -0.22666 1.2967 -0.39 1.89 -0.49 s1.13 -0.15 1.61 -0.15 c1.4133 0 2.5066 0.33666 3.28 1.01 s1.16 1.75 1.16 3.23 l0 5.86 c-0.52 0.14666 -1.12 0.29 -1.8 0.43 s-1.4133 0.21 -2.2 0.21 c-0.69334 0 -1.3233 -0.06 -1.89 -0.18 s-1.0533 -0.32 -1.46 -0.6 s-0.72 -0.64666 -0.94 -1.1 s-0.33 -1.0067 -0.33 -1.66 s0.13666 -1.2 0.41 -1.64 s0.62668 -0.79 1.06 -1.05 s0.92 -0.44334 1.46 -0.55 s1.0833 -0.16 1.63 -0.16 z M43.58 9.92 c0.16 -0.10666 0.38332 -0.21 0.66998 -0.31 s0.61 -0.15 0.97 -0.15 c0.30666 0 0.55666 0.01334 0.75 0.04 s0.29 0.03332 0.29 0.01998 l0 2.66 c-0.30666 -0.02666 -0.60666 -0.03332 -0.9 -0.01998 c-0.25334 0.02666 -0.51668 0.07 -0.79002 0.13 s-0.52334 0.17 -0.75 0.33 c-0.26666 0.18666 -0.45666 0.44 -0.57 0.76 s-0.17 0.76 -0.17 1.32 l0 5.32 l-3 0 l0 -7.94 l-1.62 0 l1.28 -2.54 l3.34 0 l0 0.78 c0.06666 -0.05334 0.12666 -0.10668 0.18 -0.16002 c0.05334 -0.04 0.10668 -0.08334 0.16002 -0.13 s0.10668 -0.08332 0.16002 -0.10998 z M52.83999999999999 15.42 c-0.13334 -0.02666 -0.2733 -0.04338 -0.41996 -0.050038 s-0.27332 -0.01 -0.37998 -0.01 c-0.56 0 -1.0133 0.08666 -1.36 0.26 s-0.52 0.47334 -0.52 0.9 c0 0.26666 0.06334 0.47666 0.19 0.63 s0.28332 0.26668 0.46998 0.34002 s0.38332 0.11668 0.58998 0.13002 s0.38332 0.02 0.52998 0.02 c0.26666 0 0.56666 -0.03334 0.9 -0.1 l0 -2.12 z M51.79999999999999 13.219999999999999 c0.10666 0 0.24996 0.0033594 0.42996 0.01002 s0.38334 0.01666 0.61 0.03 c-0.01334 -0.52 -0.19668 -0.85666 -0.55002 -1.01 s-0.81 -0.23 -1.37 -0.23 c-0.30666 0 -0.66 0.03666 -1.06 0.11 s-0.83334 0.18334 -1.3 0.33 l-0.32 -1.1 c-0.04 -0.14666 -0.09666 -0.36 -0.17 -0.64 s-0.12334 -0.5 -0.15 -0.66 c0.66666 -0.22666 1.2967 -0.39 1.89 -0.49 s1.13 -0.15 1.61 -0.15 c1.4133 0 2.5066 0.33666 3.28 1.01 s1.16 1.75 1.16 3.23 l0 5.86 c-0.52 0.14666 -1.12 0.29 -1.8 0.43 s-1.4133 0.21 -2.2 0.21 c-0.69334 0 -1.3233 -0.06 -1.89 -0.18 s-1.0533 -0.32 -1.46 -0.6 s-0.72 -0.64666 -0.94 -1.1 s-0.33 -1.0067 -0.33 -1.66 s0.13666 -1.2 0.41 -1.64 s0.62668 -0.79 1.06 -1.05 s0.92 -0.44334 1.46 -0.55 s1.0833 -0.16 1.63 -0.16 z M57.99999999999999 12.04 l-1.68 0 l1.32 -2.48 l2.9 0 l0.26 1.12 c0.33334 -0.36 0.73 -0.66 1.19 -0.9 s0.99 -0.36 1.59 -0.36 c1.2133 0 2.1134 0.32334 2.7 0.97 s0.88 1.67 0.88 3.07 l0 6.54 l-3.04 0 l0 -6.02 c0 -0.61334 -0.15 -1.0533 -0.45 -1.32 s-0.68334 -0.4 -1.15 -0.4 c-0.38666 0 -0.73332 0.13 -1.04 0.39 s-0.46 0.69 -0.46 1.29 l0 6.06 l-3.02 0 l0 -7.96 z"></path></g></svg>

          {/* <h1 className="me-2 Navlogo">Smaran</h1> */}



          {/* <span className="title">Smaren</span> */}
        </a>

        <div className="ms-auto d-flex align-items-center">
        {/* Custom Switch */}
        <div className="form-check form-switch custom-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch"></label>
        </div>



          {/* <button
            className="btn btn-sm btn-outline-light darkmode-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button> */}
      </div>
      </nav>

      {/* Main Content */}
      <div
        className={`min-vh-100 d-flex flex-column align-items-center py-10 ${
          darkMode ? "bg-dark text-white" : "bg-light"
        }`}
        // style={{
        //   background: darkMode ? "none" : "#F4F3F2",
        // }}
      >
        {/* Add Reminder */}
        <div
          className="card shadow-lg text-white p-4 w-100 w-md-75 w-lg-50"
          style={{
            marginTop:"60px",
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
            ➕ Add
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
                            className="p-3 text-grey rounded shadow-sm animate__animated animate__fadeIn card-hover"
                            style={{
                              background: reminder.completed ? darkcolors[index % darkcolors.length] : colors[index % colors.length],
                              color: fontcolors[index % fontcolors.length],
                              borderRadius: "12px",
                              filter: reminder.completed ? 'brightness(50%)' : 'brightness(100%)',

                            }}
                          >
                            <h5 className="mb-1" style={{textDecoration: reminder.completed ? "line-through" : "none",
                            }}>{reminder[1]}</h5>
                            <p className="mb-1" style={{textDecoration: reminder.completed ? "line-through" : "none",
                            }}>{reminder[2]}</p>
                            <small style={{textDecoration: reminder.completed ? "line-through" : "none",
                            }}>{reminder[3]}</small>
                            <div className="mt-2 d-flex justify-content-end align-items-center">
                      <button
                        className="btn btn-success btn-sm me-2 completed-btn"
                        onClick={() => toggleComplete(reminder[0])}
                      >
                        ✔️
                      </button>
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        onClick={() => deleteReminder(reminder[0])}
                      >
                        🗑️
                      </button>
                    </div>


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
