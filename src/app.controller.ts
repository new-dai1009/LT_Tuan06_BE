import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Trả về tất cả cuốn sách!
  @Get('/books')
  getAll(): string {
    return 'all books';
  }
  //Trả về một cuốn sách theo id
  @Get('/books/:id')
  getBookId(@Param('id') id: string): string {
    return `Sách có id ${id}`;
  }
  //thêm 1 cuốn cách
  @Post('/books')
  create(@Body() body: any): string {
    return 'Thêm thành công';
  }

  //Xóa 1 cuốn sách theo id
  @Delete('/books/:id')
  remove(@Param('id') id: string): string {
    return `Xóa sách có id ${id} thành công`;
 }
}
