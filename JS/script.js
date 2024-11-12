const sidebar = document.getElementById("sidebar")
const taskBar = document.getElementById("addTask")

function toggleSidebar() {
    sidebar.classList.toggle("close")
}

function toggleDescription(event, button) {
    event.preventDefault();
    button.classList.toggle("rotate");
    const taskItem = button.closest('.task-item'); 
    const description = taskItem.querySelector('.description'); 
    description.classList.toggle("show");
}

function toggleTask(event) {
    event.preventDefault();
    taskBar.classList.toggle("open");
}

const sidebarLinks = document.querySelectorAll('#sidebar ul li a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('focused'));
        link.classList.add('focused'); 

        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form dikirim secara langsung
    
    let formData = new FormData(this); // Mengambil data form
    
    fetch("./internal/create.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("result").innerHTML = data;
    })
    .catch(error => console.error("Error:", error));
});