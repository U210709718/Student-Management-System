// ** students Management
//1: getTotal                                         DONE 
//2: add (create) a new student to a course           DONE
//3: save to local storage                            DONE
//4: clear inputs after adding a student              DONE
//5: Read                                             DONE
//6: Delete one or all                                DONE
//7: update                                           DONE
//8: search                                           DONE
//9: clean data                                       DONE


//call all elements by Id :  //inputs:
let studentname = document.getElementById("studentname");  // Select the dropdown element
let courseInStudents = document.getElementById("courseInStudents");
let midterm = document.getElementById("midterm"); // Global variable declaration
let final = document.getElementById("final");
let total = document.getElementById("total");
let submitstudent = document.getElementById("submitstudent");

let moodS = 'createS';
let tempS; //global var to reach index i



// function 1 : get total (%40 midterm + %60 final) !
function getTotal()
{ //function will work when midterm , and final are entered only! 
    //make sure data is entered! otherwise do not run
    if(midterm.value !== '' && final.value !== ''){ // Check if both midterm and final inputs are filled

         // Parse input values as numbers (important since inputs are strings)
        let midtermScore = parseFloat(midterm.value);
        let finalScore = parseFloat(final.value);

        let result = (midtermScore * 0.4) + (finalScore * 0.6);
        // Display the result in the "total" element
        total.textContent = result.toFixed(2); // Show result with 2 decimal places
        // when final and midterm are inserted it will be green !
        total.style.background = '#46923c'

    } else {
        // If inputs are incomplete, make total red!
        total.innerHTML =''; //make it empty
        total.style.background = '#d12a1e' //color of total is red

    }
}




//3: save to local storage
let dataStu;
//if local storage has data don't delete it!
if(localStorage.student != null){
    dataStu = JSON.parse(localStorage.student);
}else{ //if the local storage empty create a new array!
    dataStu= [];//save objects inside this array!
} 



//function 2: add (create) a new student to a course
submitstudent.onclick = function(){
    //save each course as a object with its properties !
    let newStu = {
        studentname : studentname.value , 
        courseInStudents : courseInStudents.value ,
        midterm : midterm.value ,
        final : final.value ,
        total : total.innerHTML , 

    }
    if(moodS == 'createS'){
        dataStu.push(newStu);

    }
    else{ //if mode update just update do not make new cell!
        dataStu [tempS] = newStu;
        //button has to be back to add and empty the inputs!
        moodS = 'createS';
        submitstudent.innerHTML = 'Add';

    }
    
    // console.log(dataStu) //TEST! Yes WORKING

    localStorage.setItem('student', JSON.stringify(dataStu))
     // Link student to course in course data
     // Update dropdown with new course added
    clearStudentData();
    showStudentsData();
    getTotal();
     
}
// Populate student dropdown with available courses on page load
dataCourse.forEach(course => {
    updateCourseOptionsInStudentManagement(course.courseDropdown);
});


//4: clear inputs after adding a student
function clearStudentData(){
    studentname.value='';
    midterm.value='';
    final.value='';
    total.innerHTML= '';

    
}
function showStudentsData(){
    let table= '';
    for(let i=0 ; i< dataStu.length ; i++){
        table += ` 
        <tr>
            <td>${i+1}</td>
            <td>${dataStu[i].studentname}</td>
            <td>${dataStu[i].courseInStudents}</td>
            <td>${dataStu[i].midterm}</td>
            <td>${dataStu[i].final}</td>
            <td>${dataStu[i].total}</td>
            <td> 'N/A'</td>  
            <td>'N/A'</td>
            <td><button onclick="updateStudentData(${i})" id="updateStudent">Update</button>
            <td><button onclick="deleteStudentData(${i})" id="deleteStudent">Delete</button> 
            
        </tr>
        `;
        
    }
    document.getElementById('tSbody').innerHTML = table; // Update the table content


    let btnDeleteStudents = document.getElementById('deleteAllStudents');
    if(dataStu.length > 0){ //if length > 0 means there is data
        btnDeleteStudents.innerHTML = `
        <button onclick="deleteAllStudents()"> Delete All</button>`;
    }else{
        btnDeleteStudents.innerHTML ='';

    }

}
showStudentsData();
//6: Delete one or all

function deleteStudentData(i){
    dataStu.splice(i,1);
    localStorage.student = JSON.stringify(dataStu);
    showStudentsData();


}
// follow 6: delete all , if there is data !
function deleteAllStudents(){
    //data in local stoarage , array !
    localStorage.clear();
    dataStu.splice(0);
    showStudentsData();

}

//function 7: update
//done by steps : 1- grap all values and bring it to the input brackets  . 2- change button into update and update. 3- button has to be back to add and empty the inputs!


function updateStudentData(i){
    // console.log(i);  TESTED THE FUNCTION ! its working!
    studentname.value = dataStu[i].studentname
    courseInStudents.value = dataStu[i].courseInStudents
    midterm.value = dataStu[i].midterm
    final.value = dataStu[i].final

    getTotal(); //to get total!

    // 2- change add button into update and update
    submitstudent.innerHTML = 'Update';

    //make 2 moods : Update and create!
    moodS = 'updateS';
    tempS = i;

}

//8: search
//first : know the search is by student name or by course name or by student status?
//create three moods!
let searchMoodS = 'studentname';
function getSearchMoodS(id){
    let searchStu = document.getElementById('searchStudent');
    if(id == 'searchStudentName'){
        searchMoodS = 'studentname';
        searchStu.placeholder ='Search by student name'
    }else if(id == 'searchCourseNameS'){
        searchMoodS = 'course';
        searchStu.placeholder ='Search by course name'

    }else{
        searchMoodS = 'PassFail';
        searchStu.placeholder ='Search by Student status: pass or fail'
    }
    searchStu.focus();
}

function searchStudentData(value){
    let table='';
    if(searchMoodS == 'studentname'){ //Search by student name
        for(let i=0 ; i< dataStu.length ; i++){
            if(dataStu[i].studentname.includes(value)){
                // console.log(i);
                table += ` 
                <tr>
                    <td>${i+1}</td>
                    <td>${dataStu[i].studentname}</td>
                    <td>${dataStu[i].courseInStudents}</td>
                    <td>${dataStu[i].midterm}</td>
                    <td>${dataStu[i].final}</td>
                    <td>${dataStu[i].total}</td>
                    <td> 'N/A'</td>  
                    <td>'N/A'</td>
                    <td><button onclick="updateStudentData(${i})" id="updateStudent">Update</button>
                    <td><button onclick="deleteStudentData(${i})" id="deleteStudent">Delete</button> 
            
                </tr>
                `;

            }

        }


    }else if(searchMoodS == 'course'){ // Search by course name
        for(let i=0 ; i< dataStu.length ; i++){
            if(dataStu[i].courseInStudents.includes(value)){
                // console.log(i);
                table += ` 
                <tr>
                    <td>${i+1}</td>
                    <td>${dataStu[i].studentname}</td>
                    <td>${dataStu[i].courseInStudents}</td>
                    <td>${dataStu[i].midterm}</td>
                    <td>${dataStu[i].final}</td>
                    <td>${dataStu[i].total}</td>
                    <td> 'N/A'</td>  
                    <td>'N/A'</td>
                    <td><button onclick="updateStudentData(${i})" id="updateStudent">Update</button>
                    <td><button onclick="deleteStudentData(${i})" id="deleteStudent">Delete</button> 
            
                </tr>
                `;

            }
            
        }


    }else{ //Search by Student status: pass or fail
        console.log("I didn't do this part :(");

    }
    document.getElementById('tSbody').innerHTML = table; // Update the table content

}
