package com.example.boot.Service;

import com.example.boot.Dto.ViewListDTO;
import com.example.boot.Entity.Animation;
import com.example.boot.Entity.ViewList;

import java.util.List;

public interface ViewListService {

    void ViewListAdd(ViewListDTO viewListDTO);

    List<Animation> ViewListgatdata (String userid);

}
