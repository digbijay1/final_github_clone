function myFunction() {
    var user_entering_value = document.getElementById('exampleInputEmail1').value
    loadUser(user_entering_value)
}

//fetch the api using async and await
async function loadUser(user_entering_value) {
    //for giving authorized to github
    const headers = {
        "Authorization": `token 28b06f4704c8d613e8ffe83739d94854c10c1c65`,
    }
    document.getElementById('newsBody').innerHTML = ''
    try {
        const url = `https://api.github.com/users/${user_entering_value}/repos`
        //getting responsae from url and passing the header for the authorization part
        const response = await fetch(url, {
            "methods": "GET",
            "headers": headers
        });

        //getting the fetch data
        var data = await response.json();
        if (data.message === 'Not Found') {
            alert("Wrong USER_ID,Pls Give a correct")
        }
        //console.log(typeof (data))
        var div = document.createElement("div")
        div.setAttribute("class", "ul_class")
        //  div.setAttribute("id", "li_class")
        var ul = document.createElement("ul")
        ul.setAttribute("id", "ul1")
        //passing the username id and get the all the repo of the particular user
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li")
            li.innerHTML = data[i].name;
            li.setAttribute("id", "giving_color")

            //var card=document.getElementById("singh")   
            //console.log(card)
            var card = document.createElement("div")
            card.setAttribute("class", "card")
            //card.setAttribute("class","bg-primary ")
            ul.appendChild(card)

            var files_of_the_particular_user = data[i].name
            //calling the second nested function to pass the files name and the userid
            await loadUser2(user_entering_value, files_of_the_particular_user)


            async function loadUser2(user_entering_value, files_of_the_particular_user) {
                const headers = {
                    "Authorization": `token 28b06f4704c8d613e8ffe83739d94854c10c1c65`,
                }

                try {
                    const url = `https://api.github.com/repos/${user_entering_value}/${files_of_the_particular_user}/git/trees/master?recursive=1`
                    const response = await fetch(url,
                        {
                            "methods": "GET",
                            "headers": headers
                        });

                    var data1 = await response.json();
                    //console.log(data1)
                    var result = Object.keys(data1).map((key) => [Number(key), data1[key]]);
                    //console.log(result.length)

                    //console.log(typeof(data1))

                    //console.log(data1.tree[i.path])
                    //console.log(result[2][1])
                    for (var i = 0; i < result[2][1].length; i++) {
                        //  document.getElementById("singh").innerHTML+=`<li></li>`
                        //var li1=document.createElement("li")
                        // ul.appendChild(li1)
                        var ul1 = document.createElement("ul")
                        li.appendChild(ul1)
                        ul1.setAttribute("class", "ul1_class")
                        var li1 = document.createElement("li")
                        ul1.appendChild(li1)
                        li1.innerHTML = result[2][1][i].path
                        console.log(result[2][1][i].path)
                    }

                    // console.log(typeof(data1.tree[0]))
                }
                catch (err) {
                    console.log("err1")
                }

            }
            ul.appendChild(li)
            div.appendChild(ul)
            const newsBody = document.getElementById('newsBody');
            newsBody.append(div);
            document.body.appendChild(newsBody);
            // console.log(data)  
            //console.log(files_of_the_particular_user);
            //bro here i am facing the issue i have just uncomment the things
        }
    }
    catch (err) {
        //alert("hi")
        console.log(" bad url")
    }

}





