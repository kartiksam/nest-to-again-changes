import { ResponseProfileDto } from "src/modules/user-details/dto/Response-dto";

export function toResponseProfileDto(profile: any): ResponseProfileDto {
    return {
        _id: profile._id,

        address: {
            street: profile.address?.street,
            city: profile.address?.city,
            state: profile.address?.state,
            pinCode: profile.address?.pinCode
        },

        contactNUmber: profile.contactNUmber,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        createdBy: profile.createdBy
    }
}