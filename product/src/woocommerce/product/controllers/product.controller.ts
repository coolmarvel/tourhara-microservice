// import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
// import { ProductService } from '../services/product.service';
// import { MessagePattern } from '@nestjs/microservices';
// import { CreateProductReqDto, DeleteProductReqDto, PageReqDto, RetrieveProductReqDto, UpdateProductReqDto } from '../dtos/req.dto';

// @Controller({ path: 'product', version: VERSION_NEUTRAL })
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   // WooCommerce Staging Order APIs
//   @MessagePattern({ cmd: 'createAProduct_stag' })
//   async createAProduct_stag(data: CreateProductReqDto) {
//     return await this.productService.createAProduct_stag(data);
//   }

//   @MessagePattern({ cmd: 'retrieveAProduct_stag' })
//   async retrieveAProduct_stag({ product_id }: RetrieveProductReqDto) {
//     return await this.productService.retrieveAProduct_stag(product_id);
//   }

//   @MessagePattern({ cmd: 'listAllProducts_stag' })
//   async listAllProducts_stag({ page, size }: PageReqDto) {
//     return await this.productService.listAllProducts_stag(page, size);
//   }

//   @MessagePattern({ cmd: 'updateAProduct_stag' })
//   async updateAProduct_stag({ product_id, data }: UpdateProductReqDto) {
//     return await this.productService.updateAProduct_stag(product_id, data);
//   }

//   @MessagePattern({ cmd: 'deleteAProduct_stag' })
//   async deleteAProduct_stag({ product_id }: DeleteProductReqDto) {
//     return await this.productService.deleteAProduct_stag(product_id);
//   }

//   // WooCommerce Staging Order APIs
//   @MessagePattern({ cmd: 'createAProduct_prod' })
//   async createAProduct_prod(data: CreateProductReqDto) {
//     return await this.productService.createAProduct_prod(data);
//   }

//   @MessagePattern({ cmd: 'retrieveAProduct_prod' })
//   async retrieveAProduct_prod({ product_id }: RetrieveProductReqDto) {
//     return await this.productService.retrieveAProduct_prod(product_id);
//   }

//   @MessagePattern({ cmd: 'listAllProducts_prod' })
//   async listAllProducts_prod({ page, size }: PageReqDto) {
//     return await this.productService.listAllProducts_prod(page, size);
//   }

//   @MessagePattern({ cmd: 'updateAProduct_prod' })
//   async updateAProduct_prod({ product_id, data }: UpdateProductReqDto) {
//     return await this.productService.updateAProduct_prod(product_id, data);
//   }

//   @MessagePattern({ cmd: 'deleteAProduct_prod' })
//   async deleteAProduct_prod({ product_id }: DeleteProductReqDto) {
//     return await this.productService.deleteAProduct_prod(product_id);
//   }

//   // synchronizeProduct
//   @MessagePattern({ cmd: 'synchronizeProduct_stag' })
//   async synchronizeProduct_stag() {
//     return await this.productService.synchronizeProduct_stag();
//   }

//   @MessagePattern({ cmd: 'synchronizeProduct_prod' })
//   async synchronizeProduct_prod() {
//     return await this.productService.synchronizeProduct_prod();
//   }
// }
