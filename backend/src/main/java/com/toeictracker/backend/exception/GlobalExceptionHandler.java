package com.toeictracker.backend.exception;

import com.toeictracker.backend.auth.EmailAlreadyExistsException;
import com.toeictracker.backend.auth.UserNotFoundException;
import com.toeictracker.backend.user.InvalidCurrentPasswordException;
import com.toeictracker.backend.user.PasswordMismatchException;
import com.toeictracker.backend.user.SamePasswordException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    //指定するデータが見つからなかったとき
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    //登録しようとした時にEmailが既に使われていたとき
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ProblemDetail handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
    }

    //パスワード変更時に現在のパスワードが間違っていた時
    @ExceptionHandler(InvalidCurrentPasswordException.class)
    public ProblemDetail handleInvalidCurrentPassword(InvalidCurrentPasswordException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    //パスワード変更時に現在のパスワードと変更するパスワードが同じ時
    @ExceptionHandler(SamePasswordException.class)
    public ProblemDetail handleSamePassword(SamePasswordException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    //新しいパスワードと確認用パスワードが一致しないとき
    @ExceptionHandler(PasswordMismatchException.class)
    public ProblemDetail handlePasswordMismatch(PasswordMismatchException ex){
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    //アクセス権限がないとき
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex){
        return ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    //バリデーション
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, "入力内容に誤りがあります");
        problemDetail.setProperty("errors", errors);
        return problemDetail;
    }

    // バリデーション
    @ExceptionHandler(HandlerMethodValidationException.class)
    public ProblemDetail handleHandlerMethodValidation(HandlerMethodValidationException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "入力内容に誤りがあります"
        );
    }

    //許可されていないHTTPリクエストが送られてきたとき
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ProblemDetail handleHttpRequestNotSupported(){
        return ProblemDetail.forStatusAndDetail(HttpStatus.METHOD_NOT_ALLOWED,"このHTTPメソッドは許可されていません");
    }

    //requestのJsonの型が間違っているとき
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleHttpMessageNotReadable(){
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,"リクエストの形式が不正です");
    }

    //DB制約に反しているとき
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail handleDataIntegrityViolation() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "データの登録または更新に失敗しました");
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFound(){
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, "ユーザーが見つかりません");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuthenticationException() {
        return ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED,"メールアドレスまたはパスワードが正しくありません");
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleException(){
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "予期しないエラーが発生しました");
    }

}
