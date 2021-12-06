document.querySelectorAll('div[data-ba-course-id]').forEach(e => {
    var a = document.createElement('a');
    a.href = window.location + '/author/' +e.attributes['data-ba-course-id'].value;
    a.target = "_blank";
    a.innerText="New Tab";
    e.appendChild(a);
})
