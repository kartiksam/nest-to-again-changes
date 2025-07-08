import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { PermissionService } from "../permission/permission.service";


@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private permissionService: PermissionService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const path = request.route.path;
        const method = request.method;

        const fullPath = `${method} ${path}`;

        const allowed = await this.permissionService.getPermissionsByUserId(user._id);
        if (!allowed.includes(fullPath)) {
            throw new ForbiddenException('You do not have Excess for this role ');
        }
        return true;
    }
}