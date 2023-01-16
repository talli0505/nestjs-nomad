import { IsString, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDTO } from "./create-movie.dto";

// // 똑같은 내용 또 쓴거
// export class UpdateMovieDTO {

//   // 물음표를 붙이게 되면 필수가 아니라 선택
//   @IsString()
//   readonly title? : string;

//   @IsNumber()
//   readonly yaer? : number;

//   @IsString({each: true})
//   readonly genres? : string[];
// }

// 부분 타입 partial type
// 타입을 변환시키고 사용할 수 있게 하는 패키지
// DTO 변화를 도와줌
// npm i @nestjs/mapped-types --save --legacy-peer-deps
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {

}
