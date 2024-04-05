package com.company.project.service;

import com.company.project.core.Result;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface FileService {

    //Result uploadSingle(HttpServletRequest request,MultipartFile file);

    void export(HttpServletRequest request, HttpServletResponse response);

    //Result uploadSingleName(HttpServletRequest request, MultipartFile file);

    Result uploadSinglePhoto(HttpServletRequest request, MultipartFile file);

    Result upload( MultipartFile file) throws IOException;

    Result uploadSingleName(HttpServletRequest request, MultipartFile file);

}
