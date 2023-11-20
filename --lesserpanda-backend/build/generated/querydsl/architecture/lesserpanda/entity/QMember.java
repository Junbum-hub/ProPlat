package architecture.lesserpanda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -108526736L;

    public static final QMember member = new QMember("member1");

    public final EnumPath<Authority> authority = createEnum("authority", Authority.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath introduce = createString("introduce");

    public final StringPath loginId = createString("loginId");

    public final StringPath loginPassword = createString("loginPassword");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final ListPath<Post, QPost> userPostList = this.<Post, QPost>createList("userPostList", Post.class, QPost.class, PathInits.DIRECT2);

    public final ListPath<Reply, QReply> userReplyList = this.<Reply, QReply>createList("userReplyList", Reply.class, QReply.class, PathInits.DIRECT2);

    public final ListPath<UserStack, QUserStack> userStackList = this.<UserStack, QUserStack>createList("userStackList", UserStack.class, QUserStack.class, PathInits.DIRECT2);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

