const apiUrl='http://34.168.80.42:3001/classify/job';
const data = {
    "colleage": "*",
    "stack": "*",
    "category": "*"
};

fetch(apiUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(result => {
        let datalist=result.results;
        let container=document.getElementById(`content-mainpage-job`);

        datalist.forEach((item,index) => {
            //여기에 코드 작성
            let contentMain=document.createElement('div');
            contentMain.className='content-main';

            let image=document.createElement('img');
            image.className='image-box img';
            image.setAttribute('style','display:block;witdh:100%;height:auto');
            image.src=item.image;

            let content_box=document.createElement('div');
            content_box.className='content-box';

            let nameElement = document.createElement('p');
            nameElement.textContent = item.job;
            nameElement.setAttribute('style','font-size:large; margin-top: 5px;margin-bottom: 1px; font-weight: bold;');
            nameElement.addEventListener('click', function() {
                let data={
                    "job":nameElement.textContent,
                    "category":JSON.stringify(item.category)
                }
                console.log(data);
                let params=new URLSearchParams(data).toString();
                window.location.href ='../pages/job-detail.html?' + params;
            });
            // let categoryElement = document.createElement('span');
            // categoryElement.textContent = "       분류: "+ item.category;
            // categoryElement.setAttribute('style', 'font-size: small; color:#979797');
            // nameElement.appendChild(categoryElement);

            let nameEngElement = document.createElement('p');
            nameEngElement.textContent = item.category;
            nameEngElement.setAttribute('style','margin: 0px 0px; font-size: 5px;');
            let introElement = document.createElement('p');
            introElement.textContent = item.instruction.long_script;
            introElement.setAttribute('style','font-size:small;margin-top: 10px;margin-bottom: 1px;');

            let content_tag=document.createElement('div');
            content_tag.className='content-tag';
            item.stack.forEach((stack,index)=>{
                let tag=document.createElement('div');
                tag.className='tag';
                tag.textContent="#"+stack;
                content_tag.appendChild(tag);
            })
            
            //tag들 넘겨받아서 배열이든 뭐든 해서 반복문 써서 출력
            let allElements=document.createElement('div');
            allElements.setAttribute('style','display:flex; flex-direction:column;justify-content:space-between;height:100%');
            content_box.appendChild(nameElement);
            content_box.appendChild(nameEngElement);
            content_box.appendChild(introElement);
            allElements.appendChild(content_box);
            allElements.appendChild(content_tag);
            contentMain.appendChild(image);
            contentMain.appendChild(allElements);
            container.appendChild(contentMain);
        });


    })
    .catch(error => {
    console.error('Error:', error);
    });


// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
        
//         data.data.forEach((item,index) => {

//             let contentMain = document.getElementById(`department${index}`)

//             let logoElement=contentMain.querySelector(`.image-box img`);
//             logoElement.src=item.logo;
//             let nameElement=contentMain.querySelector(`.content-box > p:nth-child(1)`)
//             nameElement.textContent = item.d_name;
//             let nameEngElement=contentMain.querySelector(`.content-box > p:nth-child(2)`)
//             nameEngElement.textContent = item.d_name_e;
//             let introElement=contentMain.querySelector(`.content-box > p:nth-child(3)`)
//             introElement.textContent = item.intro;

//             let homepage= contentMain.querySelector(`#departmentMain`);
//             homepage.setAttribute('href', item.homepage);
//             homepage.target='_blank';
//             homepage.style.textDecoration='none';
//             let abeek= contentMain.querySelector(`#abeek`);
//             abeek.setAttribute('href', item.abeek);
//             abeek.target='_blank';
//             abeek.style.textDecoration='none';
//         });
        
//     })
//     .catch(error => console.error('Error:', error));
