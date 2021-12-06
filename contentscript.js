

const nodeUpdated = [];

setInterval(() => {
    Array.from(document.querySelectorAll('div[data-ba-course-id]')).filter(e => !nodeUpdated.includes(e)).forEach(e => {
        var a = document.createElement('a');
        a.href = window.location + 'author/' + e.attributes['data-ba-course-id'].value;
        a.target = "_blank";
        a.innerText = "Open in new tab";
        a.classList.add("custom-button-1");
        e.appendChild(a);
        nodeUpdated.push(e);
    })
}, 1000);
