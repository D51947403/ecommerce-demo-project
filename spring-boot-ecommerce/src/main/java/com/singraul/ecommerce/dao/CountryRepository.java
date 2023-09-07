package com.singraul.ecommerce.dao;

import com.singraul.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel ="countries" ,path = "countries")
public interface CountryRepository extends JpaRepository <Country ,Integer>{

    List<Country> findCountryByCode(@Param("code")String code);

}
