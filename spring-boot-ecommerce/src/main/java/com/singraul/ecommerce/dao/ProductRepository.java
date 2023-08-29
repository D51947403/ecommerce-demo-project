package com.singraul.ecommerce.dao;

import com.singraul.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200") // allow access from angular app  at port 4200
public interface ProductRepository extends JpaRepository<Product,Long> {
}
