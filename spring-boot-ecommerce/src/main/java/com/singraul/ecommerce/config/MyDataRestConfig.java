package com.singraul.ecommerce.config;

import com.singraul.ecommerce.entity.Country;
import com.singraul.ecommerce.entity.Product;
import com.singraul.ecommerce.entity.ProductCategory;
import com.singraul.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        //RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        // disable HTTP methods for Product: PUT, POST and DELETE
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        disableHttpMethods(Product.class,config, theUnsupportedActions);
        // disable HTTP methods for ProductCategory: PUT, POST and DELETE
        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);
        //disable HTTP methods for Country: PUT, POST and DELETE
        disableHttpMethods(Country.class,config, theUnsupportedActions);
        //disable HTTP methods for Country: PUT, POST and DELETE
        disableHttpMethods(State.class,config, theUnsupportedActions);
        //call an internal helper method
        exposeIds(config);
    }

    private static void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids
        //
        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities =entityManager.getMetamodel().getEntities();
        // Create an array of the entity types
      List<Class> entityClasses =new ArrayList<>();
       // get the entity types for the entities
        for(EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
      //expose the entity ids for the array of entity/domain types
        Class[] domainTypes =entityClasses.toArray(new Class[0]);

        config.exposeIdsFor(domainTypes);

    }

}
