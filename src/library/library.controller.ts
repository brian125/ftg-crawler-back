import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get ("/polijic/:keyword") 
  findPoliJic(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCataloguePolijic(finalKeyWord);
  };

  @Get ("/udea/:keyword") 
  findUdeA(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueUdea(finalKeyWord);
  };

  @Get ("/itm/:keyword") 
  findItm(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueItm(finalKeyWord);
  };

  @Get ("/sanbuenaventura/:keyword") 
  findSanbuenaventura(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueSanbuena(finalKeyWord);
  };

  @Get ("/poligrancolombiano/:keyword") 
  findPoligrancolombiano(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCataloguePoligranc(finalKeyWord);
  };

  @Get ("/ceipa/:keyword") 
  findCeipa(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueCeipa(finalKeyWord);
  };

  @Get ("/colegiatura/:keyword") 
  findColegiatura(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueColegiatura(finalKeyWord);
  };

  @Get ("/unal/:keyword") 
  findUnal(@Param('keyword') keyword: string) {
    const finalKeyWord = keyword.replace(/\s/g, "+");
    return this.libraryService.getCatalogueUnal(finalKeyWord);
  };
  
}