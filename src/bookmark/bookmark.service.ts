import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma:PrismaService){}
    getBookmarks(userId:number){
        return this.prisma.bookMark.findMany({where:{
            userId
        }})
    }
   async createBookmark(userId:number,dto:CreateBookmarkDto){
    const bookmark=await this.prisma.bookMark.create({data:{
      userId,
      ...dto  
    }})
        return bookmark;
    }
    getBookmarkById(userId:number,bookmarkId:number){
        return this.prisma.bookMark.findFirst({where:{
            id:bookmarkId,
            userId
        }}) 
    }
  
   async editBookmarkById(userId:number,bookmarkId:number,dto:EditBookmarkDto){
        //get bookmark by id
      const bookmark= await this.prisma.bookMark.findUnique({where:{id:bookmarkId}})
        //check if user owns the bookmark
      if(!bookmark || bookmark.userId !==userId){
        throw new ForbiddenException('Access to resourse denied')
      }
       
    //now user can edit 
        return this.prisma.bookMark.update({
            where:{
                id:bookmarkId},
                data:{
                    ...dto,
                }
    })
}
   async  deleteBookmarkById(userId:number,bookmarkId:number){
    //get bookmark by id
    const bookmark= await this.prisma.bookMark.findUnique({where:{id:bookmarkId}})
        //check if user owns the bookmark
      if(!bookmark || bookmark.userId !==userId){
        throw new ForbiddenException('Access to resourse denied')
      }
        await this.prisma.bookMark.delete({where:{id:bookmarkId}})
    }
}
