# SOA-project
bài tập lớn kiên trúc hướng dịch vụ

Tổng hợp API:

API cho web:
---------------------------------------------------------------
Tìm sách
```
    LINK: /webAPI/search-book-name
    INPUT:
      keySearch : key tìm kiếm sách
    OUTPUT:
      {
        "books": [
            {
                "id": id sách
                "book_name": tên sách,
                "quantity": số lượng sacgs 
            }
      }
```
---------------------------------------------------------------
Hiện tất cả các sách
```
    LINK: /webAPI/show-book-name
    INPUT:
      bookNumber : số lượng sách trong 1 trang hiện
      page: trang cần gửi
    OUTPUT:
      {
          "books": [
              {
                  "id": id sách,
                  "book_name": tên sách,
                  "quantity": số lượng sách
              }
          ]
      }
  ```
---------------------------------------------------------------
Mượn sách
```
    LINK: /webAPI/borrow-book
    INPUT:
      bookID : ID sách
      bookQuantity: số lượng sách mượn
    OUTPUT:
      {
          "status": trạng thái xử lý
      }
```
---------------------------------------------------------------
Thông tin sách
```
    LINK: /webAPI/book-detail
    INPUT:
      bookID : ID sách
    OUTPUT:
      {
          "book_detail": [
              {
                  "id": id sách,
                  "book_name": "tên sách",
                  "description": mô tả sách
              }
          ]
      }
```
---------------------------------------------------------------
