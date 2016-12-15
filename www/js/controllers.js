angular.module('app.controllers', [])

.controller('ScanCtrl', function($scope, $timeout) {
    $scope.videos = {main:"video/main.mp4",
                     scanner:"video/scanner.mp4",
                     assassin:"video/assassin.mp4",
                     templar:"video/templar.mp4"};
    $scope.state = 1;  
    $scope.isScanning = false;
    
    $scope.changeState = function(){
        $scope.state = $scope.state > 3 ? 1 : $scope.state + 1;
        $scope.updateVideo();
    }
    
    $scope.updateVideo = function(){
        if ($scope.isScanning){return;}
        var video = $scope.videos.main;
        if ($scope.state === 2){
            video = $scope.videos.scanner;
        }
        else if ($scope.state === 3){
            $scope.isScanning = true;
            document.querySelector("#videoArea video").play();
            $timeout(function(){
                $scope.isScanning = false;
                $scope.changeState();
            },6000)             
        }
        else if ($scope.state === 4){
            if (Math.random() < 0.5){
                video = $scope.videos.assassin;
            }
            else{
                video = $scope.videos.templar;
            }
            
        }
        
        var autoplay = $scope.state === 2 ? "" : "autoplay"
        
        if ($scope.state !== 3){
            var v = "<video " + autoplay + " src='" + video + "' webkit-playsinline playsinline>";
            v += "Your browser does not support the video tag";
            v += "</video>";
            $timeout(function(){
                document.querySelector("#videoArea").innerHTML = v;
            });
        }
        
    }     
    
    
    $scope.updateVideo();
    
})
