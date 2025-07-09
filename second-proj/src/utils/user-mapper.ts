import { UserDocument } from "src/schema/user.Schema";
import { ResponseUserDto } from "src/modules/users/dto/Response-user-dto";
export function toResponseDto(user: UserDocument): ResponseUserDto {
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,


    };
}
