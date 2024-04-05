package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.RoomMapper;
import com.company.project.model.GoodsDetails;
import com.company.project.model.Room;
import com.company.project.model.RoomSeat;
import com.company.project.model.User;
import com.company.project.service.GoodsDetailsService;
import com.company.project.service.RoomSeatService;
import com.company.project.service.RoomService;
import com.company.project.service.UserService;
import com.company.project.utils.DigitUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

@Service
@Transactional
public class RoomServiceImpl extends AbstractService<Room> implements RoomService {

    @Resource
    private RoomMapper roomMapper;

    @Resource
    private RoomSeatService roomSeatService;

    @Resource
    private UserService userService;

    @Resource
    private GoodsDetailsService goodsDetailsService;

    @Override
    public Result add(Room room) {

        room.setId(DigitUtil.generatorLongId());
        save(room);

        RoomSeat roomSeat;
        //生成排片对应的座位
        //x
        for (int x = 1 ; x <= 9; x++){
            //y
            for (int y = 1 ; y <= 9; y++){
                roomSeat = new RoomSeat();
                roomSeat.setCreatedAt(new Date());
                roomSeat.setIsDelete(false);
                //业务状态(0未售;1已售;2损坏)
                roomSeat.setStatus(0);
                roomSeat.setMaxX(x);
                roomSeat.setMaxY(y);
                roomSeat.setName(x + "排" + y + "座");
                roomSeat.setRoomId(room.getId());
                roomSeatService.save(roomSeat);
            }
        }

        return ResultGenerator.genSuccessResult(room);
    }

    @Override
    public Result list(Room room) {

        if (null == room){
            room = new Room();
        }

        List<List<RoomSeat>> listArrayList = new ArrayList<>();

        PageHelper.startPage(room.getPage() == null ? 0 : room.getPage(), room.getLimit() == null ? 10 : room.getLimit());
        room.setIsDelete(false);
        List<Room> list = findByModel(room);
        if (list != null && list.size() > 0){
            for (Room d:list) {
                List<RoomSeat> roomSeatList;
                for (int i = 1;i <= 9 ; i++){
                    roomSeatList = roomSeatService.selectByRoomIdAndMaxX(d.getId(),i);
                    listArrayList.add(roomSeatList);
                }
                d.setRoomSeatList(listArrayList);
            }
        }
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result recommendByUser(Room room) {
        List<Room> list = recommend(room.getCreatedBy());
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    //基于物品的协同过滤算法
    //通过计算余弦相似度并取TopN, 返回为uid的用户生成的5个推荐自习室
    public List<Room> recommend(String uid){

        List<GoodsDetails> goodsDetailsList = new ArrayList<GoodsDetails>();              //其他用户点击的自习室列表

        List<User> users = userService.selectAllUsers();                                 //所有用户列表
        List<Room> roomList = findAll();
        return roomList;//所有自习室列表
//        int[][] curMatrix = new int[roomList.size() + 1000][roomList.size() + 1000];   //当前矩阵
//        int[][] comMatrix = new int[roomList.size() + 1000][roomList.size() + 1000];   //共现矩阵
//        int[] N = new int[roomList.size() + 1000];                                      //点击每个自习室的人数
//
//        for(User user: users){
//            if(user.getCreatedBy() == uid) {
//                continue;                    //当前用户则跳过
//            }
//
//            goodsDetailsList = goodsDetailsService.findByUser(String.valueOf(user.getId())); //当前用户的点击自习室列表
//
//            for(int i = 0; i < roomList.size(); i++) {
//                for(int j = 0; j < roomList.size(); j++) {
//                    curMatrix[i][j] = 0;                               //清空矩阵
//                }
//            }
//
//            for(int i = 0; i < goodsDetailsList.size(); i++){
//                int pid1 = Math.toIntExact(goodsDetailsList.get(i).getGoodsId());
//                ++N[pid1];
//                for(int j = i+1; j < goodsDetailsList.size(); j++){
//                    int pid2 = Math.toIntExact(goodsDetailsList.get(j).getGoodsId());
//                    ++curMatrix[pid1][pid2];
//                    ++curMatrix[pid2][pid1]; //两两加一
//                }
//            }
//            //累加所有矩阵, 得到共现矩阵
//            for(int i = 0; i < roomList.size(); i++){
//                for(int j = 0; j < roomList.size(); j++){
//                    int pid1 = roomList.get(i).getId().intValue();
//                    int pid2 = roomList.get(j).getId().intValue();
//                    comMatrix[pid1][pid2] += curMatrix[pid1][pid2];
//                    comMatrix[pid1][pid2] += curMatrix[pid1][pid2];
//                }
//            }
//        }
//
//        TreeSet<Room> preList = new TreeSet<Room>(new Comparator<Room>() {
//            @Override
//            public int compare(Room o1, Room o2) {
//                if(o1.getSimilarity().equals(o2.getSimilarity())) {
//                    return (int) (o1.getSimilarity().intValue()-o2.getSimilarity().intValue()) * 100;
//                } else {
//                    return o1.getHeat()-o2.getHeat();
//                }
//            }
//        }); //预处理的列表
//
//        goodsDetailsList = goodsDetailsService.findByUser(uid);           //当前用户的点击自习室列表
//        boolean[] used = new boolean[roomList.size() + 1000];            //判重数组
//        for(GoodsDetails d: goodsDetailsList){
//            int Nij = 0;                                                    //既喜欢i又喜欢j的人数
//            double Wij;                                                     //相似度
//            Room tmp;                                                      //当前的自习室
//
//            int i = d.getGoodsId().intValue();
//            for(Room room: roomList){
//                if(d.getGoodsId().equals(room.getId())) {
//                    continue;
//                }
//                int j = room.getId().intValue();
//
//                Nij = comMatrix[i][j];
//                Wij = (double)Nij/Math.sqrt(N[i] * N[j]); //计算余弦相似度
//
//                tmp = findByIdAndValidDelete(room.getId());
//                if (Double.isNaN(Wij)){
//                    tmp.setSimilarity(BigDecimal.valueOf(0));
//                }else {
//                    tmp.setSimilarity(BigDecimal.valueOf(Wij));
//                }
//
//                if(used[tmp.getId().intValue()]) {
//                    continue;
//                }
//                preList.add(tmp);
//                used[tmp.getId().intValue()] = true;
//            }
//        }
//
//        List<Room> recomLists = new ArrayList<Room>();      //生成的推荐结果
//        for(int i = 0; preList.size() > 0 && i<5; i++){
//            recomLists.add(preList.pollLast());
//            preList.pollLast();
//        }
//        if(recomLists.size() < 10){
//            //推荐数量不满10个, 随机获取十个实例
//            List<Room> list = roomMapper.randList();
//
//            List<Room> listAll = new ArrayList<Room>();
//
//            listAll.addAll(recomLists);
//            listAll.addAll(list);
//
//            listAll = new ArrayList<Room>(new LinkedHashSet<>(listAll));
//
//            recomLists = listAll;
//        }
//
//        return recomLists;
    }

    @Override
    public Result detail(Long id) {

        if (null == id){
            return ResultGenerator.genSuccessResult(new Room());
        }else {
            Room room = findById(id);
            if (null == room){
                return ResultGenerator.genSuccessResult(new Room());
            }else {

                List<List<RoomSeat>> listArrayList = new ArrayList<>();

                List<RoomSeat> roomSeatList;
                for (int i = 1;i <= 9 ; i++){
                    roomSeatList = roomSeatService.selectByRoomIdAndMaxX(room.getId(),i);
                    listArrayList.add(roomSeatList);
                }
                room.setRoomSeatList(listArrayList);
                return ResultGenerator.genSuccessResult(room);
            }
        }
    }
}
