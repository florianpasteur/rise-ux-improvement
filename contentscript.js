

const nodeUpdated = [];

function updateNodes(selector, fn) {
    Array.from(document.querySelectorAll(selector))
        .filter(e => !nodeUpdated.includes(e))
        .forEach((element, index, array) => {
        fn(element, index, array)
        nodeUpdated.push(element);
    })
}

setInterval(() => {

    updateNodes('div[data-ba-course-id]', e => {
        const a = document.createElement('a');
        a.href = 'https://rise.articulate.com/author/' + e.attributes['data-ba-course-id'].value;
        a.target = "_blank";
        a.innerText = "Open in new tab";
        a.classList.add("custom-button-1");
        e.appendChild(a);
    })

    updateNodes('.course-folder > button',(e, i) => {
        e.addEventListener('click', function () {
            window.location = ("" + window.location).replace(/#[A-Za-z0-9_\-]*$/, '') + "#folder-" + i;
        })
    });
}, 500);


let anchorJumpInterval = setInterval(() => {
    let folderButtons = Array.from(document.querySelectorAll('.course-folder > button'));
    if (folderButtons.length > 3) {
        const folderIndex = parseInt(window.location.hash.replace("#folder-", ''));
        if (!isNaN(folderIndex) && folderIndex > 0 && folderButtons[folderIndex]) {
            folderButtons[folderIndex].click();
            clearInterval(anchorJumpInterval);
        }
    }
}, 500);
