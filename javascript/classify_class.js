let checkedValuesByGroup = {
    colleage: "",
    semester:"",
    stack: [],
    category:"*"
};
let cnt=-1;
const data = {
    "colleage": "*",
    "stack": "*",
    "category": "*",
    "semeter":"*"
};
requestData(data);

let checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        
        let groupName = this.closest('.search-name').childNodes[0].textContent.trim();
        if(groupName=='학과') groupName='colleage';
        if(groupName=='학기') groupName='semester';
        if(groupName=='주언어') groupName='stack';
        // 체크 상태인 경우

        if(groupName=='stack'){
            if (this.checked) {
                // value를 해당 그룹의 배열에 추가
                checkedValuesByGroup[groupName].push(this.value);
            } else {
                // 체크가 해제된 경우 배열에서 해당 value 제거
                let index = checkedValuesByGroup[groupName].indexOf(this.value);
                if (index !== -1) {
                    checkedValuesByGroup[groupName].splice(index, 1);
                }
            }
            requestData(checkedValuesByGroup);
        }
        else if(groupName=='semester'||groupName=='colleage'){
            if (this.checked) {
                // value를 문자열 그 자체로 추가
                checkedValuesByGroup[groupName] += checkedValuesByGroup[groupName].length===0 ? this.value: '|'+ this.value ;
                // checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(/\|$/, '');
            } else {
                // 체크가 해제된 경우 문자열에서 해당 value 제거
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(this.value , '');
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(/(\|)+/g, '|');
                checkedValuesByGroup[groupName] = checkedValuesByGroup[groupName].replace(/^\||\|$/g, '');
            }
            requestData(checkedValuesByGroup);
        }
    });
});

function requestData(data) {
    const apiUrl = 'http://34.168.80.42:3001/classify/subject';
    cnt++;
    let postData={
        "colleage":data.colleage||"*",
        "stack": data.stack.length === 0 ? "*" : data.stack,
        "semeter":data.semester||"*",
        "category":"*"
    }
    console.log("postData",postData);
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(result => {
            if (cnt != 0) clearData();

            console.log("result",result);
            let datalist = result.subject;
            let container = document.getElementById(`content-mainpage-subject`);

            datalist.forEach((item, index) => {
                //여기에 코드 작성
                let contentMain = document.createElement('div');
                contentMain.className = 'content-main';

                let image = document.createElement('div');
                let img = document.createElement('img');
                image.className = 'image-box';
                img.src = item.element.image;
                img.setAttribute('style', 'width:100%;height:auto;object-fit: contain;');
                image.appendChild(img);

                let content_box = document.createElement('div');
                content_box.className = 'content-box';

                let nameElement = document.createElement('p');
                nameElement.textContent = item.element.c_name;
                nameElement.setAttribute('style', 'font-size:large; margin-top: 5px;margin-bottom: 1px; font-weight: bold;');
                nameElement.addEventListener('click', function () {
                    let data = {
                        "colleage": nameEngElement.textContent,
                        "stack": JSON.stringify(item.element.stack),
                        "category": item.element.category[0],
                        "semeter": item.element.semeter,
                        // "department": item.element.department,
                        "c_name": item.element.c_name
                    }
                    // console.log(item.element.stack,item.element.category);
                    // console.log(data);
                    let params = new URLSearchParams(data).toString();
                    window.location.href = '../pages/class-detail.html?' + params;
                });
                // let categoryElement = document.createElement('span');
                // categoryElement.textContent = "       분류: "+ item.category;
                // categoryElement.setAttribute('style', 'font-size: small; color:#979797');
                // nameElement.appendChild(categoryElement);

                let nameEngElement = document.createElement('p');
                nameEngElement.textContent = item.element.collage;
                nameEngElement.setAttribute('style', 'margin: 0px 0px; font-size: 5px;');
                let introElement = document.createElement('p');
                introElement.textContent = item.element.instruction.long_script;
                introElement.setAttribute('style', 'font-size:small;margin-top: 10px;margin-bottom: 1px;');

                let content_tag = document.createElement('div');
                content_tag.className = 'content-tag';
                item.element.category.forEach((stack, index) => {
                    let tag = document.createElement('div');
                    tag.className = 'tag';
                    tag.textContent = "#" + stack;
                    content_tag.appendChild(tag);
                })

                //tag들 넘겨받아서 배열이든 뭐든 해서 반복문 써서 출력

                content_box.appendChild(nameElement);
                content_box.appendChild(nameEngElement);
                content_box.appendChild(introElement);
                content_box.appendChild(content_tag);
                contentMain.appendChild(image);
                contentMain.appendChild(content_box);
                container.appendChild(contentMain);
            });

            function clearData(){
                let container = document.getElementById(`content-mainpage-subject`);
                container.innerHTML=``;
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });

}

