const apiUrl='http://34.168.80.42:3001/classify/subject';
const data = {
    "colleage": "*",
    "stack": "*",
    "category": "*",
    "semester":"*"
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
        let datalist=result.subject;
        let container=document.getElementById(`content-mainpage-subject`);

        datalist.forEach((item,index) => {
            //여기에 코드 작성
            let contentMain=document.createElement('div');
            contentMain.className='content-main';

            let image=document.createElement('div');
            let img=document.createElement('img');
            image.className='image-box';
            img.src=item.element.image;
            img.setAttribute('style','width:100%;height:auto;object-fit: contain;');
            image.appendChild(img);

            let content_box=document.createElement('div');
            content_box.className='content-box';

            let nameElement = document.createElement('p');
            nameElement.textContent = item.element.c_name;
            nameElement.setAttribute('style','font-size:large; margin-top: 5px;margin-bottom: 1px; font-weight: bold;');
            nameElement.addEventListener('click', function() {
                let data={
                    "colleage":nameEngElement.textContent,
                    "stack": JSON.stringify(item.element.stack),
                    "category":item.element.category[0],
                    "semester": item.element.semeter,
                    // "department": item.element.department,
                    "c_name": item.element.c_name
                }
                // console.log(item.element.stack,item.element.category);
                // console.log(data);
                let params=new URLSearchParams(data).toString();
                window.location.href ='../pages/class-detail.html?' + params;
            });
            // let categoryElement = document.createElement('span');
            // categoryElement.textContent = "       분류: "+ item.category;
            // categoryElement.setAttribute('style', 'font-size: small; color:#979797');
            // nameElement.appendChild(categoryElement);

            let nameEngElement = document.createElement('p');
            nameEngElement.textContent = item.element.collage;
            nameEngElement.setAttribute('style','margin: 0px 0px; font-size: 5px;');
            let introElement = document.createElement('p');
            introElement.textContent = item.element.instruction.long_script;
            introElement.setAttribute('style','font-size:small;margin-top: 10px;margin-bottom: 1px;');

            let content_tag=document.createElement('div');
            content_tag.className='content-tag';
            item.element.category.forEach((stack,index)=>{
                let tag=document.createElement('div');
                tag.className='tag';
                tag.textContent="#"+stack;
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


    })
    .catch(error => {
    console.error('Error:', error);
    });
