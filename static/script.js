// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item => {
    const a = item.parentElement.querySelector('a:first-child');
    a.addEventListener('click', function(e) {
        e.preventDefault();

        if (!this.classList.contains('active')) {
            allDropdown.forEach(i => {
                const aLink = i.parentElement.querySelector('a:first-child');

                aLink.classList.remove('active');
                i.classList.remove('show');
            })
        }

        this.classList.toggle('active');
        item.classList.toggle('show');
    })
})


// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if (sidebar.classList.contains('hide')) {
    allSideDivider.forEach(item => {
        item.textContent = '-'
    })
    allDropdown.forEach(item => {
        const a = item.parentElement.querySelector('a:first-child');
        a.classList.remove('active');
        item.classList.remove('show');
    })
} else {
    allSideDivider.forEach(item => {
        item.textContent = item.dataset.text;
    })
}

toggleSidebar.addEventListener('click', function() {
    sidebar.classList.toggle('hide');

    if (sidebar.classList.contains('hide')) {
        allSideDivider.forEach(item => {
            item.textContent = '-'
        })

        allDropdown.forEach(item => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
        })
    } else {
        allSideDivider.forEach(item => {
            item.textContent = item.dataset.text;
        })
    }
})




sidebar.addEventListener('mouseleave', function() {
    if (this.classList.contains('hide')) {
        allDropdown.forEach(item => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
        })
        allSideDivider.forEach(item => {
            item.textContent = '-'
        })
    }
})



sidebar.addEventListener('mouseenter', function() {
    if (this.classList.contains('hide')) {
        allDropdown.forEach(item => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
        })
        allSideDivider.forEach(item => {
            item.textContent = item.dataset.text;
        })
    }
})




// PROFILE DROPDOWN
// const profile = document.querySelector('nav .profile');
// const imgProfile = profile.querySelector('img');
// const dropdownProfile = profile.querySelector('.profile-link');

// imgProfile.addEventListener('click', function() {
//     dropdownProfile.classList.toggle('show');
// })



// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item => {
    const icon = item.querySelector('.icon');
    const menuLink = item.querySelector('.menu-link');

    icon.addEventListener('click', function() {
        menuLink.classList.toggle('show');
    })
})


window.addEventListener('click', function(e) {
    // if (e.target !== imgProfile) {
    //     if (e.target !== dropdownProfile) {
    //         if (dropdownProfile.classList.contains('show')) {
    //             dropdownProfile.classList.remove('show');
    //         }
    //     }
    // }

    allMenu.forEach(item => {
        const icon = item.querySelector('.icon');
        const menuLink = item.querySelector('.menu-link');

        if (e.target !== icon) {
            if (e.target !== menuLink) {
                if (menuLink.classList.contains('show')) {
                    menuLink.classList.remove('show')
                }
            }
        }
    })
})


// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item => {
    item.style.setProperty('--value', item.dataset.value)
})


// APEXCHART
var options = {
    series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};

// 展示表格信息
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

function showRowData(button) {
    // 获取所在行
    var row = button.parentNode.parentNode;
    // 获取所有单元格
    var cells = row.getElementsByTagName("td");
    // 构建行数据
    var rowData = "";
    for (var i = 0; i < cells.length - 1; i++) {
        rowData += "<tr><td>" + cells[i].textContent + "</td></tr>";
    }
    alert(rowData);
}

// Todo
function completeTodo() {
    console.log(event.target)
    const class_name = event.target.classList[2]
    console.log(class_name)
    if (class_name == "bx-meh-blank") {
        const parent = event.target.parentNode;
        const grandparent = parent.parentNode.parentNode;
        event.target.classList.add("bx-laugh");
        event.target.classList.remove("bx-meh-blank");
        let width = 0;
        const interval = setInterval(() => {
            grandparent.style.background = `linear-gradient(to right, lightgreen ${width}%, #f1f0f6 ${width}%)`;
            width += 20;
            if (width > 100) {
                clearInterval(interval);
                grandparent.style.background = 'lightgreen';
            }
        }, 100);
    } else if (class_name == "bx-laugh") {
        const parent = event.target.parentNode;
        const grandparent = parent.parentNode.parentNode;
        event.target.classList.remove("bx-laugh");
        event.target.classList.add("bx-meh-blank");
        let width = 0;
        const interval = setInterval(() => {
            grandparent.style.background = `linear-gradient(to left, #f1f0f6 ${width}%, lightgreen ${width}%)`;
            width += 20;
            if (width > 100) {
                clearInterval(interval);
                grandparent.style.background = '#f1f0f6';
            }
        }, 100);

    }

}

// 新建一个TODO事项
const createTodo = document.querySelectorAll('main .table-data .todo .head .btn-create')[0];
createTodo.addEventListener('click', function(e) {
    // console.log(createTodo)
    const list_todo_content = document.getElementById("list_todo_content")
    const newChildElement = document.createElement('li');
    newChildElement.className = "not-completed";
    newChildElement.innerHTML = `
    <input type="text" value="Edition" style="width: 100%; height: 100%; border: none; background: inherit;font-size: 18px;font-weight: bold">                       
    <div>
        <a href="#" class="btn-todo-status">
            <i class='bx bx-sm bx-meh-blank' onclick="completeTodo()"></i>
        </a>
        &nbsp;
        <a href="#" class="btn-todo-status">
            <i class='bx bx-sm bx-x' onclick="deleteTodo()"></i>
        </a>
    </div>
        `;
    list_todo_content.appendChild(newChildElement);
    // console.log(list_todo_content)
})


function deleteTodo() {
    const parent = event.target.parentNode;
    // console.log(parent.className);
    console.log(parent.className == "btn-todo-status")
    if (parent.className == "btn-todo-status") {
        const cu_ele = parent.parentNode.parentNode;
        // console.log(cu_ele.className);
        cu_ele.remove();
    }
}