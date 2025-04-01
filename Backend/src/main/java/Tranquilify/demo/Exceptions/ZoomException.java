package Tranquilify.demo.Exceptions;

import org.springframework.http.ResponseEntity;

public class ZoomException extends Exception{

    ResponseEntity<String> responseEntity;

    public ZoomException(ResponseEntity<String> response){

        responseEntity = response;
    }
}
