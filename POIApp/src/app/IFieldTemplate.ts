export interface IFieldTemplate
{
    SNO:String;
    Name:String;
    Section:String;
    Placeholder:String;
    FileName:String;
    Amount:String;
    FileInfo:File;
    Min:Number;
    Max:Number;
    AdditionalInfo:Map<string,string>;
    ItemCode:String;
}