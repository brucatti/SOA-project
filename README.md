# SOA-project
bài tập lớn kiên trúc hướng dịch vụ

Tổng hợp API:

API cho web:
---------------------------------------------------------------
Tìm sách
```JavaScript
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
```JavaScript
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
```JavaScript
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
```JavaScript
    LINK: /webAPI/book-detail
    INPUT:
      bookID : ID sách
    OUTPUT:
      {
          "book_detail": [
              {
                  "id": id sách,
                  "book_name": tên sách,
                  "description": mô tả sách
              }
          ]
      }
```
---------------------------------------------------------------

API cho desktop:
---------------------------------------------------------------
Danh sách sách có trong thư viện
```JavaScript
    LINK: /desktopAPI/show-book-list
    INPUT:
    OUTPUT:
      {
          "booksList": [
              {
                  "id": id sách,
                  "book_name": tên sách,
                  "description": mô tả sách,
                  "quantity": số lượng sách
              }
          ]
      }
```
---------------------------------------------------------------
Thêm sách vào thư viện
```JavaScript
    LINK: /desktopAPI/add-book
    INPUT:
        bookName: têm sách
        bookQuantity: số lượng sách
        bookDescription: thông tin sách
    OUTPUT:
      {
          'status': trạng thái
      }
```
---------------------------------------------------------------
Xóa sách trong thư viện
```JavaScript
    LINK: /desktopAPI/delete-book
    INPUT:
        bookID: ID sách
    OUTPUT:
      {
          'status': trạng thái 
      }
```
---------------------------------------------------------------
Chỉnh sửa sách trong thư viện
```JavaScript
    LINK: /desktopAPI/adjust-book
    INPUT:
        bookID: ID sách 
        bookName: têm sách
        bookQuantity: số lượng sách
        bookDescription: thông tin sách
    OUTPUT:
      {
          'status': trạng thái
      }
```
