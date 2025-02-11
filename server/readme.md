
## API Dokümantasyonu

### Genel Endpoint'ler

#### 1. Sunucu Durumu

-   **URL:**  `/api/get/server-status`

-   **Method:**  `GET`

-   **Açıklama:**  Sunucunun çalışıp çalışmadığını kontrol eder.

-   **Örnek Yanıt:**

    ```json
    {
      "server": true
    }
    ```


#### 2. Uygulama Versiyonu

-   **URL:**  `/api/get/version`

-   **Method:**  `GET`

-   **Açıklama:**  Uygulamanın versiyon bilgisini döndürür.

-   **Örnek Yanıt:**

    ```json
    {
      "version": "1.0.0",
      "time": "2023-10-10T12:00:00.000Z"
    }
    ```


----------

### Kullanıcı İşlemleri

#### 1. Kullanıcı Kaydı

-   **URL:**  `/api/post/register`

-   **Method:**  `POST`

-   **Body:**

    ```json
    {
      "email": "kullanici@example.com",
      "password": "sifre123",
      "businessName": "İşletme Adı",
      "businessType": "İşletme Türü",
      "ownerFirstName": "Ad",
      "ownerLastName": "Soyad"
    }
    ```

-   **Açıklama:**  Yeni bir kullanıcı kaydı oluşturur.

-   **Örnek Yanıt:**

    ```json
    {
      "authData": {  },
      "userData": {  }
    }
    ```


#### 2. Kullanıcı Girişi

-   **URL:**  `/api/post/login`

-   **Method:**  `POST`

-   **Body:**

    ```json
    {
      "email": "kullanici@example.com",
      "password": "sifre123"
    }
    ```

-   **Açıklama:**  Kullanıcı girişi yapar ve bir JWT token döndürür.

-   **Örnek Yanıt:**

    ```json 
    {
      "success": true,
      "token": "jwt_token"
    }
    ```


#### 3. Kullanıcı Bilgilerini Getir

-   **URL:**  `/api/get/user`

-   **Method:**  `GET`

-   **Query Parametreleri:**

    -   `userId`: Kullanıcı ID'si

-   **Açıklama:**  Belirli bir kullanıcının bilgilerini getirir.

-   **Örnek Yanıt:**

   ``` json
    {
      "userId": "123",
      "email": "kullanici@example.com",
      "business_name": "İşletme Adı",
      "business_type": "İşletme Türü",
      "owner_first_name": "Ad",
      "owner_last_name": "Soyad"
    }
```


----------

### Kategori İşlemleri

#### 1. Kategori Oluştur

-   **URL:**  `/api/post/createCategory`

-   **Method:**  `POST`

-   **Body:**

    -   `name`: Kategori adı

    -   `description`: Kategori açıklaması

    -   `ownerId`: Kategori sahibi ID'si

    -   `image`: Kategori resmi (dosya yükleme)

-   **Açıklama:**  Yeni bir kategori oluşturur.

-   **Örnek Yanıt:**

    ```json
    {
      "success": true,
      "data": {  }
    }
    ```


#### 2. Kategorileri Getir

-   **URL:**  `/api/get/categories`

-   **Method:**  `GET`

-   **Query Parametreleri:**

    -   `ownerId`: Kategori sahibi ID'si

-   **Açıklama:**  Belirli bir kullanıcının kategorilerini getirir.

-   **Örnek Yanıt:**

    ```json
    {
      "success": true,
      "data": [
        { "id": "1", "name": "Elektronik", "description": "Elektronik ürünler", "image": "url" },
        { "id": "2", "name": "Giyim", "description": "Giyim ürünleri", "image": "url" }
      ]
    }
    ```


#### 3. Kategori Sil

-   **URL:**  `/api/delete/deleteCategory`

-   **Method:**  `DELETE`

-   **Query Parametreleri:**

    -   `id`: Kategori ID'si

    -   `ownerId`: Kategori sahibi ID'si

-   **Açıklama:**  Belirli bir kategoriyi siler.

-   **Örnek Yanıt:**

    ```json    
    {
      "success": true,
      "message": "Category deleted successfully"
    }
    ```


----------

### Korumalı Route

#### 1. Korumalı Route

-   **URL:**  `/api/protected`

-   **Method:**  `GET`

-   **Header:**

    -   `Authorization: Bearer <token>`

-   **Açıklama:**  Sadece geçerli bir JWT token ile erişilebilen korumalı bir route.

-   **Örnek Yanıt:**

 ```json 
    {
      "message": "Protected data",
      "user": {  }
    }
```


----------

### Çıkış İşlemi

#### 1. Çıkış Yap

-   **URL:**  `/api/logout`

-   **Method:**  `POST`

-   **Açıklama:**  Kullanıcıyı oturumdan çıkarır ve çerezleri temizler.

-   **Örnek Yanıt:**

    ```json
    {
      "success": true,
      "message": "Logged out successfully"
    }
    ```


----------

## Hata Yönetimi

-   **401 Unauthorized:**  Geçersiz veya eksik token.

-   **403 Forbidden:**  Yetkisiz erişim.

-   **404 Not Found:**  Kaynak bulunamadı.

-   **500 Internal Server Error:**  Sunucu tarafında bir hata oluştu.