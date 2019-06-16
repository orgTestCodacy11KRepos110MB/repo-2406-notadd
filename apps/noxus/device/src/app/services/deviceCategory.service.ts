import { Injectable } from '@nestjs/common';
import { MagnusClient, gql } from '@notadd/magnus-client';
import { DeviceCategory } from '@magnus/db';

@Injectable()
export class DeviceCategoryService {
    constructor(
        public readonly client: MagnusClient
    ) { }
    /**
     * 查询所有设备分类
     * @param devCat 
     */
    async DeviceCategoryFind(devCat: DeviceCategory): Promise<DeviceCategory[]> {
        const result = await this.client.query({
            query: gql`query deviceCategoryFind($options:DeviceCategoryFindManyOptions!){
            deviceCategoryFind(options:$options){
              data{
                device_category_id,
                title
              }
            }
        }
        `,
            variables: {
                "options": {

                }
            }
        })
        return result.data;
    }
    /**
     * 插入设备分类
     * @param devcat 
     */
    async DeviceCategoryInsert(devcat: DeviceCategory): Promise<DeviceCategory> {
        return await this.client.mutate({
            mutation: gql`
           mutation DeviceCategoryInsert($entity: !){
            deviceCategoryInsert(entity:$entity){
            identifiers
            generatedMaps
    }
  }
           `,
            variables: {
                "entity": {
                    "title": "nihaome"
                }

            }
        })
    }
    /**
     * 根据device_category_id 删除设备
     * @param where 
     */
    async DeviceCategoryDelete(where: Partial<DeviceCategory>): Promise<DeviceCategory> {
        return await this.client.mutate({
            mutation: gql`
            mutation DeviceCategoryDelete($where:DeviceCategoryFindConditions!){
             deviceCategoryDelete(where:$where){
             affected
  }
}
            `,
            variables: {
                "where": {
                    "device_category_id": 2
                }

            }
        })
    }


}