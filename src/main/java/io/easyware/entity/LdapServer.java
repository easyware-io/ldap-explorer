package entity.finance;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "payee")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payee {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "domain_id", nullable = false)
    @Builder.Default private UUID domainId = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @JsonbTransient
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type", length = 32)
    private String logoContentType;

    @Column(name = "active", nullable = false)
    @Builder.Default private boolean active = true;

    @Column(name = "show_as_suggestion", nullable = false)
    @Builder.Default private boolean showAsSuggestion = true;

    @Transient
    @Column(name = "transaction_count")
    private Integer transactions;

    @Transient
    @Column(name = "transaction_amount")
    private Double transactionsAmount;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "payee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PayeeBranch> branches;
}
