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
    //搜索标签页面

    //首页轮播页面
    public function SystemIndexBanner(){
        if(!Session::has('admin')){ //不存在session
            return $this->redirect('admin/login/login');
        }
        return $this->fetch('indexBanner');
    }
    //首页轮播页面

}
