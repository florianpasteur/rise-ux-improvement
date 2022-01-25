const nodeUpdated = [];

function nodes(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function updateNodes(settingName, selector, fn) {
    ifEnabled(settingName, () =>
        nodes(selector)
            .filter(e => !nodeUpdated.includes(e))
            .forEach((element, index, array) => {
                fn(element, index, array)
                nodeUpdated.push(element);
            })
    )
}

const cache = new Map();
function ifEnabled(settingName, fn) {
    if (cache.has(settingName)) {
        if (!cache.get(settingName)) {
            fn();
        }
    } else {
        chrome.storage.sync.get([settingName], function (result) {
            cache.set(settingName, result[settingName])
            if (!cache.get(settingName)) {
                fn();
            }
        })
    }


}

setInterval(() => {
    updateNodes('newTabCourses', 'div[data-ba-course-id]', e => {
        const a = document.createElement('a');
        a.href = 'https://rise.articulate.com/author/' + e.attributes['data-ba-course-id'].value;
        a.target = "_blank";
        a.innerText = "Open in new tab";
        a.classList.add("button--outline");
        a.classList.add("button");
        e.appendChild(a);
    });

    updateNodes('bookmarks', '.course-folder > button', (e) => {
        e.addEventListener('click', function () {
            window.location = ("" + window.location).replace(/#.*$/, '') + "#folder:" + this.innerText.replace(/\W/g, '');
        });
    });

    updateNodes('newTabLessons', '.course-outline-lesson .course-outline-lesson__action', (e, i) => {
        const id = (nodes('.course-outline-lesson input')[i].id + "").replace('input-', '');
        const a = document.createElement('a');
        a.innerText = "Edit in new tab";
        a.classList.add("button--outline");
        a.classList.add("button");
        a.target = "_blank";
        a.href = ("" + window.location).replace(/#.*$/, '') + "#/author/details/" + id;
        const editContentElement = e.querySelector('.course-outline-lesson__edit-content');
        if (editContentElement) {
            editContentElement.parentNode.prepend(a);
        }
    });

    updateNodes('codeSpanInsert', '.fr-toolbar', (e, i) => {
        const codespanInsert = document.createElement('button');
        const codeBlockInsert = document.createElement('button');
        codespanInsert.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i>";
        codeBlockInsert.innerHTML = "<i class=\"fa fa-terminal\" aria-hidden=\"true\"></i>";
        [codespanInsert, codeBlockInsert].forEach(b => {
            b.classList.add("fr-command")
            b.classList.add("fr-btn")
            b.classList.add("btn-font_awesome")
        })
        const searchAndReplace = template  => function () {
            const selection = document.getSelection();
            if (selection) {
                let text = "";
                if (selection.baseNode.nodeName === "#text") {
                    text = selection.baseNode;
                    selection.baseNode.replaceWith("CODESPANTOREPLACE")
                    const innerHTML = selection.baseNode.parentNode.innerHTML;
                    selection.baseNode.parentNode.innerHTML = innerHTML.replace('CODESPANTOREPLACE', template(text))
                }
            }
        };
        codespanInsert.addEventListener('click', searchAndReplace(text => `<span style="color: rgb(96, 110, 138); border: 1px solid rgb(231, 233, 242); padding: 0.3px 5px; background: rgb(245, 247, 248); border-radius: 4px;">${text.textContent}</span>`));
        codeBlockInsert.addEventListener('click', searchAndReplace(text => `<p style="color: rgb(96, 110, 138); border: 1px solid rgb(231, 233, 242); padding: 0.3px 5px; background: rgb(245, 247, 248); border-radius: 4px;">${text.textContent}</p>`));

        e.append(codespanInsert)
        e.append(codeBlockInsert)
    });
}, 500);

ifEnabled('bookmarks', () => {
    const folderName = window.location.hash.replace("#folder:", '');
    if (folderName) {
        let anchorJumpInterval = setInterval(() => {
            let folderButtons = nodes('.course-folder > button');
            const folderButton = folderButtons.find(e => e.innerText.replace(/\W/g, '') === folderName);
            if (folderButton) {
                folderButton.click();
                clearInterval(anchorJumpInterval);
            }
        }, 500);
    }
})

ifEnabled('largeSidebar', () => {
    setTimeout(() => {
        document.body.classList.add('large-side-bar')
    }, 10)
})
