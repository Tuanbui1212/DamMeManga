package org.example.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "img_chapter")
public class ImgChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_img_chapter", nullable = false, updatable = false)
    private Long idImgChapter;

    // Thay thế mối quan hệ @ManyToOne bằng một trường ID thuần túy theo yêu cầu
    @Column(name = "chapter_id", nullable = false)
    private Long chapterId; // Khóa ngoại (ID) của Chapter cha

    @Column(name = "stt")
    private Integer stt; // Số thứ tự hình ảnh trong chapter

    @Column(name = "img_link", columnDefinition = "TEXT")
    private String imgLink; // Đường dẫn ảnh

    // Constructors
    public ImgChapter() {}

    public ImgChapter(Long chapterId, Integer stt, String imgLink) {
        this.chapterId = chapterId;
        this.stt = stt;
        this.imgLink = imgLink;
    }

    // Getters and Setters

    public Long getIdImgChapter() {
        return idImgChapter;
    }

    public void setIdImgChapter(Long idImgChapter) {
        this.idImgChapter = idImgChapter;
    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public Integer getStt() {
        return stt;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }
}