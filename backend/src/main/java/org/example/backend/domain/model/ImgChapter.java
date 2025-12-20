package org.example.backend.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "img_chapter")
public class ImgChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_img_chapter", nullable = false, updatable = false)
    private Long idImgChapter;

    @Column(name = "chapter_id", nullable = false)
    private Long chapterId;

    @Column(name = "stt")
    private Integer stt; 

    @Column(name = "img_link", columnDefinition = "TEXT")
    private String imgLink;

    public ImgChapter() {}

    public ImgChapter(Long chapterId, Integer stt, String imgLink) {
        this.chapterId = chapterId;
        this.stt = stt;
        this.imgLink = imgLink;
    }

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