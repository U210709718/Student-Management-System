// ** Course Management

//1: create a course                      DONE
//2: save to local storage                DONE
//3: clear inputs after adding a course   DONE
//4: Read                                 DONE
//5: Delete one or all                    DONE
//6: update                               DONE
//7: search                               DONE
//8: clean data

//call all elements by Id : //inputs: 
const courseDropdown = document.getElementById("courseNameIncourses");  // Select the dropdown element
let instructorName = document.getElementById("instructorName");
let geadeSystem = document.getElementById("geadeSystem");
let submitcourse = document.getElementById("submitcourse");

let moodC = 'createC';
let tempC;


//Test if its working! YES working
// console.log(courseDropdown, instructorName , geadeSystem , submitcourse);

// Array containing course names
const courses = [
    "CENG Web Development",
    "CENG Mobile Application Development",
    "CENG Database Management System",
    "CENG Computer Networks"
];

// Populate the dropdown menu with course options
courses.forEach(course => {
    const option = document.createElement("option");
    option.text = course;
    option.value = course;
    courseDropdown.appendChild(option);
});


let dataCourse;
//if local storage has data don't delete it!
if(localStorage.course != null){
    dataCourse = JSON.parse(localStorage.course);
}else{ //if the local storage empty create a new array!
    dataCourse= [];//save objects inside this array!
} 


//function  1: create a course
submitcourse.onclick = function(){
    //save each course as a object with its properties !
    let newCourse = {
        courseDropdown : courseDropdown.value , 
        instructorName : instructorName.value ,
        geadeSystem : geadeSystem.value 
    }

    if(instructorName != ''){ //clean data!
        //creating a new student won't happen until student name entered !
        if(moodC == 'createC'){ //if mood create
            dataCourse.push(newCourse);
    
        }else{
            //edit the index of a sepcefic data!
            dataCourse [tempC] = newCourse;  //update mood   
            moodC = 'createC'; //make mood back to create! after updating
            submitcourse.innerHTML = 'Add';
        }
        clearCourseData(); //dont delete data if user didn't enter them all

    }
    localStorage.setItem('course', JSON.stringify(dataCourse));
    showCoursesData();
    // Update dropdown with new course added to student side!
    updateCourseOptionsInStudentManagement(newCourse.courseDropdown); // Update student dropdown with the new course


}
    

    // console.log(dataCourse) //TEST! Yes WORKING

// Update dropdown with new course added to student side

function updateCourseOptionsInStudentManagement(newCourseName) {
    const option = document.createElement("option");
    option.text = newCourseName;
    option.value = newCourseName;
    courseInStudents.appendChild(option);
}

//3: clear inputs after adding a course
function clearCourseData(){
    instructorName.value ='';
}

//4: Read data
function showCoursesData(){
    let table='';
//bring data from array to table !
    for(let i=0 ; i< dataCourse.length ; i++){
        table += ` 
        <tr>
            <td>${i+1}</td>
            <td>${dataCourse[i].courseDropdown}</td>
            <td>${dataCourse[i].instructorName}</td>
            <td>${dataCourse[i].geadeSystem}</td>
            <td><button onclick="updateCourseData(${i})" id="updateCoursesData">Update</button>
            <td><button onclick="deleteCourseData(${i})" id="deleteCourse" >Delete</button> 
            
        </tr>
        `;

    }
    document.getElementById('tCbody').innerHTML = table;
    //delete all 
    //ONLY IF there is data this button will only appear !!
    let btnDeleteCourse = document.getElementById('deleteAllCourses');
    if(dataCourse.length >0){ //if length > 0 means there is data
        btnDeleteCourse.innerHTML = `
        <button onclick="deleteAllCourses()" >Delete All</button>`
    }else{ //if there is no data
        btnDeleteCourse.innerHTML ='';

    }

}

showCoursesData();

//6: Delete one or all
//one: delete one course:
function deleteCourseData(i){
    dataCourse.splice(i,1);
    localStorage.course = JSON.stringify(dataCourse);
    showCoursesData();

}


//two :delete all , if there is data !


function deleteAllCourses(){
    //data in local stoarage , array !
    localStorage.clear();
    dataCourse.splice(0); //delete all
    showCoursesData(); //show  data

}

//6: update
//done by steps : 1- grap all values and bring it to the input brackets  . 2- change button into update and update. 3- button has to be back to add and empty the inputs!

function updateCourseData(i){
    //TEST FUNCTION , ITS WORKING!
    console.log(i); 

    // 1- grap all values and bring it to the input brackets
    courseDropdown.value = dataCourse[i].courseDropdown;
    instructorName.value = dataCourse[i].instructorName;
    geadeSystem.value = dataCourse[i].geadeSystem;

    getTotal();

    // 2- change add button into update and update. 
    submitcourse.innerHTML = 'Update';
    moodC = 'updateC';
    tempC= i; //to reach it global! i is GLOBAL now
    scroll({
        top:0,
        behavior: "smooth",
    })


}

//7: search
//first : know the search is by course name or by grading system?
//create two moods = course name , mood = gradingSys

function getSearchMoodC(id, mood){
    //this function will work when one of the buttons clicked!
    console.log('bla')
    let searchC = document.getElementById('searchCourse');
    console.log(searchC)

    if(id == 'searchCourseName'){
        console.log('inside if')
        console.log(mood)
        searchC.placeholder = 'Search By Course Name';
    }else if (id === 'searchCoursegrading') {
        console.log(mood)
        console.log('inside else')
        searchC.placeholder = 'Search By Grading System';
    }
    // console.log(searchMoodC); TEST IF WORKING ! YES
    searchC.focus();
    searchC.value ='';
    showCoursesData(); 
}

function searchCourseData(value){
    let table ='';
    // console.log(value); TEST THE FUNCTION
    for (let i = 0; i < dataCourse.length; i++) {
        if (dataCourse[i].courseDropdown.toLowerCase().includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataCourse[i].courseDropdown}</td>
                    <td>${dataCourse[i].instructorName}</td>
                    <td>${dataCourse[i].geadeSystem}</td>
                    <td><button onclick="updateCourseData(${i})">Update</button></td>
                    <td><button onclick="deleteCourseData(${i})">Delete</button></td>
                </tr>
            `;
        }
        else{
            if(dataCourse[i].geadeSystem.toLowerCase().includes(value.toLowerCase())){
                table += ` 
                <tr>
                    <td>${i+1}</td>
                    <td>${dataCourse[i].courseDropdown}</td>
                    <td>${dataCourse[i].instructorName}</td>
                    <td>${dataCourse[i].geadeSystem}</td>
                    <td><button onclick="updateCourseData(${i})" id="updateCoursesData">Update</button>
                    <td><button onclick="deleteCourseData(${i})" id="deleteCourse" >Delete</button> 
            
                </tr>
                `;
                
            }

        }
    }

    document.getElementById('tCbody').innerHTML = table;
}
