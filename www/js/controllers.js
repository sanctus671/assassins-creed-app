angular.module('app.controllers', [])

.controller('ScanCtrl', function($scope, $timeout) {
    $scope.videos = {main:"videos/main.mp4",
                     scanner:"videos/scanner.mp4",
                     assassin:"videos/assassin.mp4",
                     templar:"videos/templar.mp4"};
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
            var v = "<video " + autoplay + ">";
            v += "<source src='" + video + "' type='video/mp4'>";
            v += "</video>";
            document.querySelector("#videoArea").innerHTML = v;
        }
        
    }     
    
    
    $scope.updateVideo();
    
})
