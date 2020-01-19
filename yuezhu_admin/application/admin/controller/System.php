<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class System extends Controller{
    
    // 系统参数页面函数
    public function SystemParam(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('systemParam');
    }

    public function getSystemParamData(){
        $result = Db::query('select * from yuezhu_system_setting;');

        return array('code'=>'0','msg'=>'查询成功','data'=>$result);
    }

    public function setSystemParamData(){
        $id = (int)$_POST['id'];
        $searchRadius = $_POST['searchRadius'];
        $servicePhone = $_POST['servicePhone'];
        $userAgreement = $_POST['userAgreement'];

        $result = Db::execute("update yuezhu_system_setting set search_radius='".$searchRadius."',service_phone='".$servicePhone."',user_agreement='".$userAgreement."' where id=".$id.";");
        if($result){
            return array('code'=>'0','msg'=>'更新成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'更新数据失败','data'=>[]);
        }
    }
    // 系统参数页面函数

    //悬赏分类页面
    public function SystemRewardClass(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('rewardClass');
    }

    public function getClassData(){
        $result = Db::query('select * from yuezhu_class');
        
        return array('code'=>'0','msg'=>'查询成功','data'=>$result);
    }

    public function addRewardClass(){
        $value = $_POST['value'];
        $describe = $_POST['describe'];
        $result = Db::execute("insert into yuezhu_class ( `value`, `describe` ) values ( '".$value."', '".$describe."' );");
        if($result){
            return array('code'=>'0','msg'=>'新增成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'新增数据失败','data'=>[]);
        }
    }

    public function deleteClass(){
        $id = $_POST['id'];

        $result = Db::table('yuezhu_class')->where('id',$id)->delete();
        if($result){
            return array('code'=>'0','msg'=>'删除成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'删除数据失败','data'=>[]);
        }
    }
    //悬赏分类页面

    //搜索标签页面
    public function SystemSearchLabel(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('searchLabel');
    }

    public function addSearchLabel(){
        $value = $_POST['value'];
        $result = Db::execute("insert into yuezhu_label ( `value` ) values ( '".$value."' );");
        if($result){
            return array('code'=>'0','msg'=>'新增成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'新增数据失败','data'=>[]);
        }

    }

    public function deleteLabel(){
        $id = $_POST['id'];

        $result = Db::table('yuezhu_label')->where('id',$id)->delete();
        if($result){
            return array('code'=>'0','msg'=>'删除成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'删除数据失败','data'=>[]);
        }
    }

    public function getLabelData(){
        $result = Db::query('select * from yuezhu_label');
        
        return array('code'=>'0','msg'=>'查询成功','data'=>$result);
    }
    //搜索标签页面

    //首页轮播页面
    public function SystemIndexBanner(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('indexBanner');
    }

    public function getBannerData(){
        $result = Db::query('select * from yuezhu_banner;');

        return array('code'=>'0','msg'=>'查询成功','data'=>$result);
    }

    public function addBannerItem(){
        $banner_image = $_POST['banner_image'];
        $banner_title = !empty($_POST['banner_title'])?$_POST['banner_title']:"";
        $banner_link = !empty($_POST['banner_link'])?$_POST['banner_link']:"";
        
        $banner = $this->saveBase64Image($banner_image);
        $banner_src = $banner['url'];

        $result = Db::execute("insert into yuezhu_banner ( banner_title,banner_src,banner_link ) values ( '".$banner_title."','".$banner_src."','".$banner_link."' );");
        if($result){
            return array('code'=>'0','msg'=>'新增成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'新增数据失败','data'=>[]);
        }
    }

    public function deleteBannerItem(){
        $id = $_POST['id'];
        $result = Db::table('yuezhu_banner')->where('id',$id)->delete();
        if($result){
            return array('code'=>'0','msg'=>'删除成功','data'=>[]);
        }else{
            return array('code'=>'1','msg'=>'删除数据失败','data'=>[]);
        }
    }

    public function saveBase64Image($base64_image_content){

        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
                  //图片后缀
                  $type = $result[2];
                  //保存位置--图片名
                  $image_name=date('His').str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT).".".$type;
                  $image_file_path = '/uploads/banner/'.date('Ymd');
                  $image_file = ROOT_PATH.'public'.$image_file_path;
                  $imge_real_url = $image_file.'/'.$image_name;
                  $imge_web_url = '/yuezhu_admin/public'.$image_file_path.'/'.$image_name;
                  if (!file_exists($image_file)){
                    mkdir($image_file, 0700);
                    fopen($image_file.'\\'.$image_name, "w");
                  } 
                  //解码
                  $decode=base64_decode(str_replace($result[1], '', $base64_image_content));
                  if (file_put_contents($imge_real_url, $decode)){
                        $data['code']=0;
                        $data['imageName']=$image_name;
                        $data['url']=$imge_web_url;
                        $data['msg']='保存成功！';
                  }else{
                    $data['code']=1;
                    $data['imgageName']='';
                    $data['url']='';
                    $data['msg']='图片保存失败！';
                  }
        }else{
            $data['code']=1;
            $data['imgageName']='';
            $data['url']='';
            $data['msg']='base64图片格式有误！';
        }       
        return $data;
    }
    //首页轮播页面

}
