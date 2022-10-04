        let form = document.forms[0];
        let displaybutton = document.querySelector("form button");

        let student_data = [];
        
        function addbox(element) {
            //check if the input field is empty
            if (element.previousElementSibling.value.trim() === "") {
                return false;
            }
            //add input fields

            let newdiv = document.createElement("div");
            newdiv.setAttribute("id", "inputboxes");
            form.insertBefore(newdiv, displaybutton);
            newdiv.innerHTML = `<input type="text"  name="namearr[]" id="names" placeholder="Enter Your Name" required> 
            <input type="text" name="agearr[]" id="ages" placeholder="Enter Your Age" required> 
            <input type="text"  name="markarr[]" id="marks" placeholder="Enter Your Mark" required>
            <span  class="add" onclick="addbox(this);">+</span>
            <span  class="minus" id="minus" onclick="deletebox(this)" style="display:none">-</span>`;


            //unhide the minus sign
            element.nextElementSibling.style.display = "inline-block";

            //hide the plus sign
            element.style.display = "none";
            adddata();

        }
        function deletebox(element) {
            element.parentElement.remove();
        }
        function adddata() {
            let arrname = document.getElementsByName("namearr[]");
            let arrage = document.getElementsByName("agearr[]");
            let arrmark = document.getElementsByName("markarr[]");

            for (let i = arrname.length - 1; i < arrname.length; i++) {


                let name = arrname[i - 1].value;
                let age = arrage[i - 1].value;
                let mark = arrmark[i - 1].value;
                let data = { name: name, age: age, mark: mark };
                student_data.push(data);
                localStorage.studentdata = JSON.stringify(student_data);

            }
        }
        document.getElementById("name").addEventListener("click", function () { sort("name") });
        document.getElementById("age").addEventListener("click", function () { sort("age") });
        document.getElementById("mark").addEventListener("click", function () { sort("mark") });


        let sliced_data=[];
        let sortmethod = true;
        function sort(sortCol) {
          
            sortmethod = !sortmethod;
            if (sortmethod == true) {
                sliced_data.sort((a, b) => {
                    if (a[sortCol] < b[sortCol]) return -1;
                    return 0;
                });
            } else {
                sliced_data.sort((a, b) => {
                    if (a[sortCol] > b[sortCol]) return -1;
                    return 0;
                });
            }
            
           
            console.log(sliced_data);
                let table = document.getElementById("showtable");
                table.innerHTML="";
                let j=0;
                while(sliced_data.length!=j)
                {
                   let row = table.insertRow();
                   let namecell = row.insertCell(0);
                   let agecell = row.insertCell(1);
                   let markcell = row.insertCell(2);

                  namecell.innerHTML = sliced_data[j].name;
                  agecell.innerHTML = sliced_data[j].age;
                  markcell.innerHTML = sliced_data[j].mark;
                  j++;
               }

            
        }
        let current_page = 1;
        let records_per_page = 5;
        function prevpage() {
            if (current_page > 1) {
                current_page--;
                changepage(current_page);
            }
        }

        function nextpage() {
            if (current_page < numpages()) {
                current_page++;
                changepage(current_page);
            }
        }
        function changepage(page) {
            document.getElementById("downbar").style.display="block";
            let page_span = document.getElementById("page");
            student_data = JSON.parse(localStorage.studentdata);
            let table = document.getElementById("showtable");
            table.innerHTML = "";
            let start = records_per_page * (page - 1);
            let end = start + records_per_page;
            sliced_data = student_data.slice(start, end);

            let i = 0;
            while (sliced_data.length != i) {

                
                let row = table.insertRow();
                let namecell = row.insertCell(0);
                let agecell = row.insertCell(1);
                let markcell = row.insertCell(2);

                namecell.innerHTML = sliced_data[i].name;
                agecell.innerHTML = sliced_data[i].age;
                markcell.innerHTML = sliced_data[i].mark;
                i++;
            }

            page_span.innerHTML = page;

        }
        function numpages() {
      
            return Math.ceil(student_data.length / records_per_page);
        }
        function allclear() {
            let div = document.getElementById("inputboxes");
            
            for (let j = 0; j < student_data.length; j++) {
                document.getElementById("names").value = "";
                document.getElementById("ages").value = "";
                document.getElementById("marks").value = "";
                document.getElementById("names").style.display = "none";
                document.getElementById("ages").style.display = "none";
                document.getElementById("marks").style.display = "none";
                document.getElementById("minus").style.display = "none";
                div.innerHTML = "";
            }
            localStorage.clear();
            document.getElementById("showtable").innerHTML = "";
            document.getElementById("page").innerHTML="";
            student_data = [];
            document.getElementById("downbar").style.display="";
        }
