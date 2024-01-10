var app=angular.module("mainApp",[]);

app.controller("CRUDController",function($scope, $http){
    

$scope.STdetails=[];
// Fetch data from the backend on page load
$http.get('http://localhost:3000/api/users')
.then(function (response) {
    $scope.STdetails = response.data; // Assign fetched data to EmpList
})
.catch(function (error) {
    console.error('Error fetching users:', error);
});


$scope.AddData=function(){
    var st={
        rno:$scope.rno,
        Student_Name:$scope.Student_Name,
        Father_Name:$scope.Father_Name,
        Mother_Name:$scope.Mother_Name,
        DOB:$scope.DOB,
        Email:$scope.Email,
        Phone_No:$scope.Phone_No,
        Gender:$scope.Gender,
        Level:$scope.Level,
        Department:$scope.Department
    };
    $scope.STdetails.push(st);
    $http.post('http://localhost:3000/api/users',st)
    .then(function(response){
        console.log('user added successfully:',response.data);
        
        alert("Registration Success");

    })
    .catch(function(error){
        console.error('error adding user :',error);

    });
    ClearModel();
}

$scope.DeleteData= function(stud){
    var index=$scope.STdetails.indexOf(stud); // select index to delete
    $scope.STdetails.splice(index,1); // delete in the array

    $http.delete('http://localhost:3000/api/users/' + stud.rno)
    .then(function(response) {
        console.log('User deleted successfully:', response.data);
        // Handle success if needed
    })
    .catch(function(error) {
        console.error('Error deleting user:', error);
        // Handle error if needed
    });
    ClearModel();

};

$scope.BindSelectedData = function(stud){
    $scope.rno=stud.rno,
$scope.Student_Name=stud.Student_Name,
$scope.Father_Name=stud.Father_Name,
$scope.Mother_Name=stud.Mother_Name,
$scope.DOB=stud.DOB,
$scope.Email=stud.Email,
$scope.Phone_No=stud.Phone_No,
$scope.Gender=stud.Gender,
$scope.Level=stud.Level,
$scope.Department=stud.Department
};

$scope.UpdateData = function(){
$.grep($scope.STdetails,function(e){ //grep is used to update array 
if(e.rno==$scope.rno)
{    e.rno=$scope.rno,
    e.Student_Name=$scope.Student_Name,
        e.Father_Name=$scope.Father_Name,
        e.Mother_Name=$scope.Mother_Name,
        e.DOB=$scope.DOB,
        e.Email=$scope.Email,
        e.Phone_No=$scope.Phone_No,
        e.Gender=$scope.Gender,
        e.Level=$scope.Level,
        e.Department=$scope.Department
}
});
var updatedEmployee = {
    rno:$scope.rno,
    Student_Name:$scope.Student_Name,
        Father_Name:$scope.Father_Name,
        Mother_Name:$scope.Mother_Name,
        DOB:$scope.DOB,
        Email:$scope.Email,
        Phone_No:$scope.Phone_No,
        Gender:$scope.Gender,
        Level:$scope.Level,
        Department:$scope.Department
};
$http.put('http://localhost:3000/api/users/' + $scope.rno, updatedEmployee)
            .then(function (response) {
                console.log('User updated successfully:', response.data);

                var index = $scope.STdetails.findIndex(stud => stud.rno === $scope.rno);
                if (index !== -1) {
                    $scope.STdetails[index] = angular.copy(updatedEmployee);
                }
            })
            .catch(function (error) {
                console.error('Error updating user:', error);
            });
};

function ClearModel(){
$scope.SId='';
$scope.Name='';
$scope.Salary='';
}
});
